import React, { useEffect, useState } from 'react';
import { useMatchContext } from '../MatchProvider';
import toast, { Toaster } from 'react-hot-toast';
import { deleteLeague } from '../../apis/admin';
import LeagueForm from './LeagueForm';

const LeagueList: React.FC = () => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const { leagues, refreshLeagues } = useMatchContext();

  useEffect(() => {
    refreshLeagues();
  }, [refreshLeagues]);

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting league...');
    try {
      await deleteLeague(id);
      refreshLeagues();
      toast.success('league deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete league.', {
        id: deleteToast,
      });
    }
  };

  return (
    <div className="mt-4">
      {leagues &&
        leagues.map((league) => (
          <div
            className="px-4 py-2 rounded-lg bg-gray-200 mb-3 flex items-center justify-between"
            key={league._id}
          >
            <img
              alt={league._id}
              src={league.logo_url}
              className="h-20 w-20 rounded-md"
            />

            <div className="flex items-center gap-5 ">
              <button onClick={() => setOpenFormId(league._id)}>Edit</button>
              <button onClick={() => deleteHandler(league._id as string)}>
                Delete
              </button>
            </div>

            {openFormId === league._id && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => setOpenFormId(null)}
              >
                <div
                  className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                >
                  <LeagueForm
                    closeForm={() => setOpenFormId(null)}
                    isEdit={true}
                    league={league}
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

export default LeagueList;
