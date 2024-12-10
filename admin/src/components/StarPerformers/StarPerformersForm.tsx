import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { addStarPerformers, updateStarPerformer } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';

interface IStarPerformers {
  _id?: string;
  name: string;
  imageUrl: string;
  achievement: string;
  tournament: string;
  goals: number;
  assists: number;
  matches_played: number;
}

type StarPerformersFormProps = {
  closeForm: () => void;
  isEdit?: boolean;
  player?: IStarPerformers;
};

const StarPerformerForm: React.FC<StarPerformersFormProps> = ({
  closeForm,
  isEdit = false,
  player,
}) => {
  const [players, setPlayers] = useState<IStarPerformers[]>([
    {
      name: '',
      imageUrl: '',
      achievement: '',
      tournament: '',
      goals: 0,
      assists: 0,
      matches_played: 0,
    },
  ]);

  const { refreshStarPerformers } = useMatchContext();

  useEffect(() => {
    if (isEdit && player) {
      setPlayers([player]);
    }
  }, [isEdit, player]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = event.target;
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) =>
        i === index ? { ...player, [name]: value } : player,
      ),
    );
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      toast.error('No file selected.');
      return;
    }

    // Show loading toast
    const uploadToastId = toast.loading('Uploading file...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'thesportos'); // Replace with your Cloudinary preset

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dbzzejye6/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      setPlayers((prevPlayers) =>
        prevPlayers.map((player, i) =>
          i === index ? { ...player, imageUrl } : player,
        ),
      );

      // Update loading toast to success
      toast.success('File uploaded successfully!', { id: uploadToastId });
    } catch (error) {
      console.error('Error uploading file:', error);
      // Update loading toast to error
      toast.error('File upload failed. Please try again.', {
        id: uploadToastId,
      });
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allFieldsFilled = players.every((player) => {
      return (
        player.name &&
        player.imageUrl &&
        player.achievement &&
        player.tournament &&
        Number(player.goals) >= 0 &&
        Number(player.assists) >= 0 &&
        Number(player.matches_played) >= 0
      );
    });

    if (!allFieldsFilled) {
      toast.error('Please fill in all fields for each player.');
      return;
    }

    const loadingToast = toast.loading('Processing your request...');

    try {
      if (isEdit && player) {
        await updateStarPerformer(player._id, players[0]);
        toast.success('Player updated successfully!', { id: loadingToast });
      } else {
        await addStarPerformers(players);
        toast.success('Players added successfully!', { id: loadingToast });
      }

      refreshStarPerformers();
      closeForm();
    } catch (error) {
      toast.error('An error occurred during submission.', { id: loadingToast });
    }
  };

  return (
    <form onSubmit={submitHandler} className="h-[70vh] overflow-y-auto">
      {players.map((player, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Player Name:
          </label>
          <input
            type="text"
            name="name"
            value={player.name}
            onChange={(e) => handleInputChange(e, index)}
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter player name"
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Achievement:
          </label>
          <input
            type="text"
            name="achievement"
            value={player.achievement}
            onChange={(e) => handleInputChange(e, index)}
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter achievement"
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Tournament:
          </label>
          <input
            type="text"
            name="tournament"
            value={player.tournament}
            onChange={(e) => handleInputChange(e, index)}
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter tournament"
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Goals:
          </label>
          <input
            type="number"
            name="goals"
            value={player.goals}
            onChange={(e) => handleInputChange(e, index)}
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter goals"
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Assists:
          </label>
          <input
            type="number"
            name="assists"
            value={player.assists}
            onChange={(e) => handleInputChange(e, index)}
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter assists"
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Matches Played:
          </label>
          <input
            type="number"
            name="matches_played"
            value={player.matches_played}
            onChange={(e) => handleInputChange(e, index)}
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter matches played"
          />

          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Upload Image:
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, index)}
            className="block w-full p-2 border border-gray-300 rounded"
          />

          {player.imageUrl && (
            <div className="mt-3">
              <img
                src={player.imageUrl}
                alt="Selected preview"
                className="h-20 rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="px-4 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {isEdit ? 'Save Changes' : 'Add Player'}
      </button>
    </form>
  );
};

export default StarPerformerForm;
