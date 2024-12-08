import React, { useEffect, useMemo, useState } from 'react';
import { useMatchContext } from '../MatchProvider';
import PlayerForm from './PlayerForm';
import toast from 'react-hot-toast';
import { deletePlayer } from '../../apis/admin';

interface PlayersListProps {
  position: string;
}

const PlayersList: React.FC<PlayersListProps> = ({ position }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const closeForm = () => {
    setIsFormOpen(false);
  };
  const { players, refreshPlayers } = useMatchContext();

  useEffect(() => {
    refreshPlayers();
  }, [refreshPlayers]);

  const filteredPlayers = useMemo(() => {
    return players.filter(
      (player) => player.position.toLowerCase() === position,
    );
  }, [players, position]);

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting player...');
    try {
      await deletePlayer(id);
      refreshPlayers(); // Refresh data for all components
      toast.success('Player deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete player.', {
        id: deleteToast,
      });
    }
  };

  return (
    <div className="mt-5">
      {filteredPlayers &&
        filteredPlayers.map((player) => (
          <div
            key={player._id}
            className="px-5 py-2 bg-gray-300 mt-3 rounded-lg flex items-center justify-between shadow-lg"
          >
            <div className="flex gap-5 items-center">
              <img
                alt={player.name}
                src={player.imageUrl}
                className="h-14 w-14 rounded-md shadow-lg"
              />
              <p className="text-black">{player.name}</p>
            </div>
            <div className="flex items-center gap-5 ">
              <button onClick={() => setIsFormOpen(true)}>Edit</button>
              <button onClick={() => deleteHandler(player._id)}>Delete</button>
            </div>

            {isFormOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={closeForm}
              >
                <div
                  className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                >
                  <PlayerForm
                    isEdit={true}
                    playerData={player}
                    closeForm={closeForm}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default PlayersList;
