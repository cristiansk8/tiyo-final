"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/user?email=${session.user?.email}`);
        if (!response.ok) throw new Error("No se pudo obtener la información del perfil.");

        const data = await response.json();
        setFormData({
          name: data.user?.name || "",
          phone: data.user?.phone || "",
        });
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [status, session?.user?.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNotification("");

    if (!session?.user) {
      setNotification("⚠️ No estás autenticado.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          name: formData.name,
          phone: formData.phone,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setNotification("✅ Perfil actualizado con éxito.");
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch (error) {
      setNotification("❌ Error al actualizar el perfil. Inténtalo de nuevo.");
      console.error('Error al actualizar:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return <p>Cargando...</p>;

  return (
    <div className="text-black">


      {notification && (
        <div className={`mt-4 p-2 text-white rounded ${notification.includes("Error") ? "bg-red-500" : "bg-green-500"}`}>
          {notification}
        </div>
      )}

      {loading && <p>loading...</p>}
      <div className="p-4 max-w-6xl mx-auto">
        <div className="px-4 my-6">
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-blue-600 tracking-tight">
              General Informatión
            </h1>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmitUpdateProfile}
        className="grid grid-cols-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">

          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            className="shadow border rounded w-full py-2 px-3"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
          <input
            className="shadow border rounded w-full py-2 px-3"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between col-span-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}