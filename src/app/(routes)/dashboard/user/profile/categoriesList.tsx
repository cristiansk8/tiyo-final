'use client';
import { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface UserCategory {
  categoryId: string;
  name: string;
  selected: boolean;
  createdAt?: string;
}

export default function CategoryForm() {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState<UserCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchUserCategories = async (): Promise<UserCategory[]> => {
    try {
      if (status !== 'authenticated' || !session?.user?.email) {
        console.error('Sesión no disponible o falta email');
        return [];
      }

      const emailParam = encodeURIComponent(session.user.email);
      const response = await fetch(`/api/cat?email=${emailParam}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (status === 'loading') return;
      
      try {
        const userCategories = await fetchUserCategories();
        setCategories(userCategories);
        setSelectedCategories(
          userCategories.filter(cat => cat.selected).map(cat => cat.categoryId)
        );
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setInitialLoad(false);
      }
    };

    loadData();
  }, [status, session]);

  const handleToggle = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(catId => catId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null); // limpiar mensaje anterior

    try {
      if (!session?.user?.email) {
        throw new Error('No hay sesión activa');
      }

      const response = await fetch('/api/cat', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          selectedCategories
        })
      });

      if (!response.ok) {
        throw new Error('Error al guardar preferencias');
      }

      setMessage({ type: 'success', text: 'Preferencias actualizadas correctamente' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error desconocido'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(null), 4000); // Ocultar después de 4s
    }
  };

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4">
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm font-medium ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mb-4">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat.categoryId);
            return (
              <button
                type="button"
                key={cat.categoryId}
                onClick={() => handleToggle(cat.categoryId)}
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
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Guardando...
              </>
            ) : (
              'Guardar preferencias'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
