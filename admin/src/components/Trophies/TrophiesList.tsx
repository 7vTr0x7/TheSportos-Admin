import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { deleteTrophy } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';
import TrophyForm from './TrophyForm';

const TrophiesList: React.FC = () => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const { trophies, refreshTrophies } = useMatchContext();

  useEffect(() => {
    refreshTrophies();
  }, [refreshTrophies]);

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting trophy...');
    try {
      await deleteTrophy(id);
      refreshTrophies();
      toast.success('Trophy deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete trophy.', {
        id: deleteToast,
      });
    }
  };

  return (
    <div className="mt-4">
      {trophies &&
        trophies.map((trophy) => (
          <div
            className="px-4 py-2 rounded-lg bg-gray-200 mb-3 flex items-center justify-between"
            key={trophy._id}
          >
            <img
              alt={trophy._id}
              src={trophy.image_url}
              className="h-20 w-20 rounded-md"
            />

            <div className="flex items-center gap-5 ">
              <button onClick={() => setOpenFormId(trophy._id as string)}>
                Edit
              </button>
              <button onClick={() => deleteHandler(trophy._id as string)}>
                Delete
              </button>
            </div>

            {openFormId === trophy._id && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => setOpenFormId(null)}
              >
                <div
                  className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                >
                  <TrophyForm
                    closeForm={() => setOpenFormId(null)}
                    isEdit={true}
                    trophyData={trophy}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      <Toaster />
    </div>
  );
};

export default TrophiesList;
