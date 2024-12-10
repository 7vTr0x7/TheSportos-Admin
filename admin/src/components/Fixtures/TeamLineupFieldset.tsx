import React from 'react';
import { FaRegImage } from 'react-icons/fa';

// Image upload function to Cloudinary using fetch
const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'thesportos'); // Cloudinary upload preset
  formData.append('cloud_name', 'dbzzejye6'); // Cloudinary cloud name

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dbzzejye6/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

interface TeamLineupFieldsetProps {
  team: 'team1' | 'team2';
  lineup: Player[];
  handleAddPlayer: (team: 'team1' | 'team2') => void;
  handleRemovePlayer: (team: 'team1' | 'team2', index: number) => void;
  handlePlayerChange: (
    team: 'team1' | 'team2',
    index: number,
    key: keyof Player,
    value: string,
  ) => void;
}

const TeamLineupFieldset: React.FC<TeamLineupFieldsetProps> = ({
  team,
  lineup,
  handleAddPlayer,
  handleRemovePlayer,
  handlePlayerChange,
}) => {
  // Function to handle image change
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    team: 'team1' | 'team2',
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Upload the image to Cloudinary
        const imageUrl = await uploadImageToCloudinary(file);

        // Update the player's image URL in the lineup
        handlePlayerChange(team, index, 'imageUrl', imageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  return (
    <fieldset className="mb-4 border p-4">
      <legend className="font-bold capitalize">{team} Lineup</legend>
      {lineup.map((player, index) => (
        <div key={`${team}-player-${index}`} className="space-y-2">
          {/* Player Number */}
          <label>
            Player Number:
            <input
              type="number"
              value={player.number}
              onChange={(e) =>
                handlePlayerChange(team, index, 'number', e.target.value)
              }
              className="w-full border p-2"
            />
          </label>

          {/* Player Name */}
          <label>
            Player Name:
            <input
              type="text"
              value={player.name}
              onChange={(e) =>
                handlePlayerChange(team, index, 'name', e.target.value)
              }
              className="w-full border p-2"
            />
          </label>

          {/* Player Position */}
          <label>
            Position:
            <select
              value={player.position}
              onChange={(e) =>
                handlePlayerChange(team, index, 'position', e.target.value)
              }
              className="w-full border p-2"
            >
              <option value="" disabled>
                Select Position
              </option>
              <option value="Forward">Forward</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
          </label>

          {/* Image Selection */}
          <label
            className="block"
            htmlFor={`${player.name || `player${index}`}`}
          >
            <div className="flex gap-3 items-center mt-2">
              <FaRegImage /> Select image{' '}
            </div>
            <input
              type="file"
              name={`${player.name || `player${index}`}`}
              onChange={(e) => handleImageChange(e, team, index)}
              id={`${player.name || `player${index}`}`}
              className="w-full border border-gray-300 rounded-lg p-2 hidden"
            />
          </label>

          {/* Display Image */}
          <div>
            {player?.imageUrl &&
              player?.imageUrl !== 'https://placehold.co/400' && (
                <img
                  alt={player.name}
                  src={player?.imageUrl}
                  className="h-20"
                />
              )}
          </div>

          {/* Remove Player */}
          <button
            type="button"
            onClick={() => handleRemovePlayer(team, index)}
            className="text-red-500"
          >
            Remove Player
          </button>
        </div>
      ))}

      {/* Add Player */}
      <button
        type="button"
        onClick={() => handleAddPlayer(team)}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Add Player
      </button>
    </fieldset>
  );
};

export default TeamLineupFieldset;
