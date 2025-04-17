import { useState, useEffect } from 'react';

interface Departamento {
    id: number;
    departamento: string;
    ciudades: string[];
}

interface LocationSelectorProps {
    selectedCity?: string;
    setSelectedCity: (city: string) => void;
    selectedDepartment: string;
    setSelectedDepartment: (department: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
    selectedCity,
    setSelectedCity,
    selectedDepartment,
    setSelectedDepartment
}) => {
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('/data/colombia.json');
                const data: Departamento[] = await response.json();
                setDepartamentos(data);
            } catch (error) {
                console.error('Error cargando los departamentos:', error);
            }
        };

        fetchDepartments();
    }, []);

    useEffect(() => {
        const department = departamentos.find(dep => dep.departamento === selectedDepartment);
        setCities(department ? department.ciudades : []);
    }, [selectedDepartment, departamentos]);

    return (
        <div className="space-y-4">
            {/* Selector de Departamento */}
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Departamento:</label>
                <select
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none bg-white text-gray-900"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                    <option value="">Selecciona un departamento</option>
                    {departamentos.map((departamento) => (
                        <option key={departamento.id} value={departamento.departamento}>
                            {departamento.departamento}
                        </option>
                    ))}
                </select>
            </div>

            {/* Selector de Ciudad */}
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Ciudad:</label>
                <select
                    className={`w-full px-3 py-2 border rounded shadow-sm focus:outline-none bg-white text-gray-900 ${
                        cities.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    value={selectedCity || ''}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={cities.length === 0}
                >
                    <option value="">Selecciona una ciudad</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default LocationSelector;
