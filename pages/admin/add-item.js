import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import ItemForm from '../../components/ItemForm';
import { createMenuItem } from '../../services/menuItemsService';

export default function AddItem() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createMenuItem(formData);
      router.push('/admin/menu-items');
    } catch (err) {
      console.error('Error adding item:', err);
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Add New Menu Item">
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <ItemForm 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </AdminLayout>
  );
}
