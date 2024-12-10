import React, { useState } from 'react';
import { deleteMatch } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';
import toast from 'react-hot-toast';
import FixturesForm from './FixturesForm';
import { Match } from '../../types/fixture';

type Matches = {
  matches: Match[];
};

const MatchList: React.FC<Matches> = ({ matches }) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const closeForm = () => {
    setSelectedMatchId(null);
  };

  const { refreshMatches } = useMatchContext();

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting match...');
    try {
      await deleteMatch(id);
      refreshMatches(); // Refresh data for all components
      toast.success('Match deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete match.', {
        id: deleteToast,
      });
    }
  };

  return (
    <div>
      {matches?.length > 0 ? (
        matches.map((match: Match) => (
          <div
            key={match._id}
            className="flex items-center justify-between rounded-md bg-gray-200 px-5 py-2 mb-3"
          >
            <div className="flex items-center gap-5">
              <div>{match.team1.name}</div>
              <p>vs</p>
              <div>{match.team2.name}</div>
            </div>
            <div className="flex items-center gap-5">
              <button onClick={() => setSelectedMatchId(match._id)}>
                Edit
              </button>
              <button onClick={() => deleteHandler(match._id)}>Delete</button>
            </div>
            {selectedMatchId === match._id && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={closeForm}
              >
                <div
                  className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                >
                  <FixturesForm
                    closeForm={closeForm}
                    isEdit={true}
                    match={match}
                  />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No Matches Found</p>
      )}
    </div>
  );
};

export default MatchList;
