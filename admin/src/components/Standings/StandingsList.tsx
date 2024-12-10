import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { deleteStarPerformer } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';
import StandingsForm from './StandingsForm';

const StandingsList: React.FC = () => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const { standings, refreshStandings } = useMatchContext();

  // Refresh standings when the component mounts
  useEffect(() => {
    refreshStandings();
  }, [refreshStandings]);

  useEffect(() => {
    if (standings.length > 0 && activeTab === '') {
      setActiveTab(standings[0].league);
    }
  }, [standings, activeTab]);

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting Star Performer...');
    try {
      await deleteStarPerformer(id);
      refreshStandings();
      toast.success('Star Performer deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete Star Performer.', {
        id: deleteToast,
      });
    }
  };

  const filteredStandings =
    activeTab && standings.filter((standing) => standing.league === activeTab);

  return (
    <div className="mt-4  select-none">
      <div className="flex gap-5 items-center mb-4">
        {standings &&
          [...new Set(standings.map((standing) => standing.league))].map(
            (league, index) => (
              <div
                key={index}
                className={`px-4 py-1 rounded-md bg-gray-200 cursor-pointer ${
                  activeTab === league ? 'bg-blue-500 text-black' : ''
                }`}
                onClick={() => setActiveTab(league)} // Set active tab when clicked
              >
                {league}
              </div>
            ),
          )}
      </div>

      {filteredStandings && filteredStandings.length > 0 ? (
        filteredStandings
          .sort((a, b) => a.position - b.position)
          .map((standing) => (
            <div
              className="px-4 py-2 rounded-lg bg-gray-200 mb-3 flex items-center justify-between"
              key={standing._id}
            >
              <div className="flex items-center gap-5">
                <img
                  alt={standing._id}
                  src={standing.imageUrl}
                  className="h-12 w-12 rounded-md"
                />

                <p>{standing.position}.</p>
                <p>{standing.club}</p>
              </div>

              <div className="flex items-center gap-5 ">
                <button onClick={() => setOpenFormId(standing._id)}>
                  Edit
                </button>
                <button onClick={() => deleteHandler(standing._id as string)}>
                  Delete
                </button>
              </div>

              {openFormId === standing._id && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm mt-10"
                  onClick={() => setOpenFormId(null)}
                >
                  <div
                    className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                  >
                    <StandingsForm
                      closeForm={() => setOpenFormId(null)}
                      isEdit={true}
                      standing={standing}
                    />
                  </div>
                </div>
              )}
            </div>
          ))
      ) : (
        <p>No Standings Found</p>
      )}

      <Toaster />
    </div>
  );
};

export default StandingsList;
