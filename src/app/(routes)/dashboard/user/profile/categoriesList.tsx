'use client';
import { useEffect, useState } from "react";
import getCategories, { Category } from "./getCategories";
import { Check, X, Loader2 } from "lucide-react";

export default function CategoryForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId] = useState(""); // ID del usuario actual

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        // Inicializar todas seleccionadas
        setSelectedCategories(data.map(cat => cat.id));
        
        // Obtener ID del usuario (ajusta según tu auth system)
        // Ejemplo: const user = await getCurrentUser();
        // setUserId(user.id);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  const handleToggle = (id: number) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(catId => catId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id);
            return (
              <button
                type="button" // Importante para forms
                key={cat.id}
                onClick={() => handleToggle(cat.id)}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-green-100/50 border-2 border-green-300'
                    : 'bg-white border border-gray-200'
                } active:scale-[98%]`}
              >
                <span className={`font-medium text-sm ${
                  isSelected ? 'text-green-800' : 'text-gray-700'
                }`}>
                  {cat.name}
                </span>
                <div className={`w-5 h-5 flex items-center justify-center rounded-full ${
                  isSelected
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {isSelected ? <Check size={12} /> : <X size={12} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {selectedCategories.length} de {categories.length} seleccionadas
          </span>
          
          <button
            type="submit"
            disabled={isSubmitting || !userId}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Guardando...
              </>
            ) : (
              "Guardar preferencias"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}