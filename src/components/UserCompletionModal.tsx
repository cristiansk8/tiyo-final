import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LocationSelector from './LocationSelector';

interface ModalProps {
    openModal: boolean;
    handleModal: () => void;
}

const UserCompletionModal: React.FC<ModalProps> = ({ openModal, handleModal }) => {
    const [formData, setFormData] = useState({ phone: '' });
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!session?.user) {
            console.error('No estás autenticado');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session.user.email,
                    name: session.user.name,
                    phone: formData.phone,
                    ciudad: selectedCity,
                    departamento: selectedDepartment,
                    photo: session.user.image,
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            console.log('Registro exitoso:', data);
            handleModal();
            router.push('/');
        } catch (error) {
            console.error('Error al registrar:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!openModal) return null;

    return (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-full h-full md:max-w-[460px] md:h-auto bg-white shadow-lg py-2 rounded-md flex flex-col">
                <h2 className="text-sm font-medium text-gray-900 border-b border-gray-300 py-3 px-4 mb-4">
                    Completa tu registro
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4 flex-grow">
                    {/* Campo Teléfono */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none bg-white text-gray-900"
                            required
                        />
                    </div>

                    {/* Componente de selección de ubicación con estilos */}
                    <LocationSelector
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        selectedDepartment={selectedDepartment}
                        setSelectedDepartment={setSelectedDepartment}
                    />

                    {/* Botón Enviar */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Enviar"}
                    </button>
                </form>

                {/* Botón Cerrar */}
                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
                    <button type="button" className="h-8 px-2 text-sm rounded-md bg-gray-700 text-white" onClick={handleModal}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCompletionModal;
