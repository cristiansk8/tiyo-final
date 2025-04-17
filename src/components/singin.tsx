'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserCompletionModal from './UserCompletionModal'; // Ajusta la ruta según tu estructura de archivos

const SigninButton = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [openModal, setModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleModal = () => setModal(!openModal);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/user?correo=${session.user.email}`);
          const data = await response.json();
          if (data.registered) setIsRegistered(true);
        } catch (error) {
          console.error("Error verificando registro:", error);
        }
      }
    };
    checkUserRegistration();
  }, [session]);

  // Mueve la lógica condicional después de los Hooks
  if (pathname !== "/") return null; // Oculta el botón en otras páginas

  return (
    <>
      {/* Botones principales para usuarios registrados y no registrados */}
      {session?.user ? (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row items-center gap-4 z-50">
          {isRegistered ? (
            <Link href="/dashboard/user/profile">
              <button className="px-6 py-3 text-lg font-bold text-white bg-green-600 border-4 border-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300">
                Ver Perfil
              </button>
            </Link>
          ) : (
            <button
              type="button"
              className="px-6 py-3 text-lg font-bold text-white bg-green-600 border-4 border-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
              onClick={handleModal}
            >
              Completar registro
            </button>
          )}

          {/* Nombre del usuario */}
          <p className="text-lg font-semibold text-white bg-black px-4 py-2 rounded-lg">
            {session.user.name}
          </p>

          {/* Botón de cerrar sesión */}
          <button
            onClick={() => signOut()}
            className="rounded-lg px-3 py-2 text-base bg-white text-red-600 hover:bg-gray-100"
          >
            Salir
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="rounded-lg px-3 py-2 text-base bg-white text-blue-600 hover:bg-gray-100"
        >

        </button>
      )}

      {/* Renderiza el modal */}
      <UserCompletionModal openModal={openModal} handleModal={handleModal} />
    </>
  );
};

export default SigninButton;