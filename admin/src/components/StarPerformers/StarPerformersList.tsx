import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { deleteStarPerformer } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';
import StarPerformersForm from './StarPerformersForm';

const StarPerformersList: React.FC = () => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const { starPerformers, refreshStarPerformers } = useMatchContext();

  useEffect(() => {
    refreshStarPerformers();
  }, [refreshStarPerformers]);

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting Star Performer...');
    try {
      await deleteStarPerformer(id);
      refreshStarPerformers();
      toast.success('Star Performer deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete Star Performer.', {
        id: deleteToast,
      });
    }
  };

  return (
    <div className="mt-4">
      {starPerformers &&
        starPerformers.map((player, index) => (
          <div
            className="px-4 py-2 rounded-lg bg-gray-200 mb-3 flex items-center justify-between"
            key={player._id}
          >
            <div className="flex items-center gap-5">
              <img
                alt={player._id}
                src={player.imageUrl}
                className="h-16 w-16 rounded-md"
              />

              <p>{player.name}</p>
            </div>

            <div className="flex items-center gap-5 ">
              <button onClick={() => setOpenFormId(player._id)}>Edit</button>
              <button onClick={() => deleteHandler(player._id as string)}>
                Delete
              </button>
            </div>

            {openFormId === player._id && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm mt-10"
                onClick={() => setOpenFormId(null)}
              >
                <div
                  className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                >
                  <StarPerformersForm
                    closeForm={() => setOpenFormId(null)}
                    isEdit={true}
                    player={player}
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

export default StarPerformersList;
