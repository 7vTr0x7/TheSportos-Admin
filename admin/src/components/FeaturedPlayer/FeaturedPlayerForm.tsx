import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { addFeaturedPlayer, updateFeaturedPlayer } from '../../apis/admin';
import { FeaturedPlayer } from '../../types/fixture';
import { useMatchContext } from '../MatchProvider';

interface FeaturedPlayerFormProps {
  isEdit?: boolean;
  playerData?: FeaturedPlayer;
  closeForm: () => void;
}

const FeaturedPlayerForm: React.FC<FeaturedPlayerFormProps> = ({
  isEdit,
  playerData,
  closeForm,
}) => {
  const [formState, setFormState] = useState<FeaturedPlayer>({
    name: '',
    imageUrl: 'https://placehold.co/400',
    club: '',
    stats: {
      goals: '',
      assists: '',
      rank: '',
    },
    position: '',
  });

  const { refreshFeaturedPlayer } = useMatchContext();

  useEffect(() => {
    if (isEdit && playerData) {
      setFormState(playerData);
    }
  }, [isEdit, playerData]);

  const handleInputChange = (
    field: keyof FeaturedPlayer | 'stats',
    value: string | FeaturedPlayer['stats'],
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: field === 'stats' ? { ...prev.stats, ...value } : value,
    }));
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const cloudinaryUrl =
      'https://api.cloudinary.com/v1_1/dbzzejye6/image/upload';
    const uploadPreset = 'thesportos'; // Replace with your Cloudinary preset
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const toastId = toast.loading('Uploading image...');
    try {
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      toast.success('Image uploaded successfully!', { id: toastId });
      return data.secure_url;
    } catch (error) {
      toast.error('Error uploading image', { id: toastId });
      console.error(error);
      throw error;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setFormState((prev) => ({
          ...prev,
          imageUrl,
        }));
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, imageUrl, club, stats, position } = formState;

    if (
      !name ||
      !imageUrl ||
      !club ||
      !position ||
      !stats.goals ||
      !stats.assists ||
      !stats.rank
    ) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const toastId = toast.loading(
      `${isEdit ? 'Updating' : 'Submitting'} player data...`,
    );

    try {
      if (isEdit) {
        await updateFeaturedPlayer(playerData?._id || '', formState);
      } else {
        await addFeaturedPlayer(formState);
      }

      refreshFeaturedPlayer();

      toast.success(`${isEdit ? 'Updated' : 'Submitted'} successfully!`, {
        id: toastId,
      });
      closeForm();
    } catch (error) {
      toast.error(`Error ${isEdit ? 'updating' : 'submitting'} player data.`, {
        id: toastId,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg h-[70vh] overflow-y-auto"
    >
      <h3 className="text-2xl font-bold mb-4">
        {isEdit ? 'Edit Featured Player' : 'Add Featured Player'}
      </h3>
      <fieldset className="border p-4">
        <legend className="font-bold">Player Details</legend>
        <div className="space-y-4">
          <label className="block">
            Name:
            <input
              type="text"
              value={formState.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full border p-2"
            />
          </label>
          <label className="block">
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-2"
            />
            {formState.imageUrl && (
              <img
                src={formState.imageUrl}
                alt="Player"
                className="h-20 mt-2"
              />
            )}
          </label>
          <label className="block">
            Club:
            <input
              type="text"
              value={formState.club}
              onChange={(e) => handleInputChange('club', e.target.value)}
              className="w-full border p-2"
            />
          </label>
          <label className="block">
            Position:
            <select
              value={formState.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              className="w-full border p-2"
            >
              <option value="">Select Position</option>
              <option value="Forward">Forward</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
          </label>
          <div className="grid grid-cols-3 gap-4 w-[80%]">
            <label>
              Goals:
              <input
                type="text"
                value={formState.stats.goals}
                onChange={(e) =>
                  handleInputChange('stats', {
                    ...formState.stats,
                    goals: e.target.value,
                  })
                }
                className="border p-2"
              />
            </label>
            <label>
              Assists:
              <input
                type="text"
                value={formState.stats.assists}
                onChange={(e) =>
                  handleInputChange('stats', {
                    ...formState.stats,
                    assists: e.target.value,
                  })
                }
                className="border p-2"
              />
            </label>
            <label>
              Rank:
              <input
                type="text"
                value={formState.stats.rank}
                onChange={(e) =>
                  handleInputChange('stats', {
                    ...formState.stats,
                    rank: e.target.value,
                  })
                }
                className="border p-2"
              />
            </label>
          </div>
        </div>
      </fieldset>
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={closeForm}
          className="bg-gray-500 text-white rounded-lg px-4 py-2"
        >
          Close
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default FeaturedPlayerForm;
