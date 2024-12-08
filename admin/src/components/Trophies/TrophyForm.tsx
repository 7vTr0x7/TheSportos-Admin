import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaRegImage } from 'react-icons/fa';
import { addTrophy, updateTrophy } from '../../apis/admin';
import { Trophy } from '../../types/trophy';
import { useMatchContext } from '../MatchProvider';

type TrophyFormProps = {
  closeForm: () => void;
  isEdit?: boolean;
  trophyData?: Trophy;
};

const TrophyForm: React.FC<TrophyFormProps> = ({
  closeForm,
  isEdit,
  trophyData,
}) => {
  const [trophy, setTrophy] = useState<Trophy>({
    image_url: '',
    name: '',
  });
  const { refreshTrophies } = useMatchContext();

  useEffect(() => {
    if (trophyData && isEdit) {
      setTrophy(trophyData);
    }
  }, [trophyData, isEdit]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.loading('Uploading Trophy...', { id: 'uploading' });

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'thesportos');

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
        setTrophy((prev) => ({ ...prev, image_url: data.secure_url }));

        toast.success('Trophy uploaded successfully!', { id: 'uploading' });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading Trophy. Please try again.', {
          id: 'uploading',
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrophy((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trophy.image_url && trophy.name) {
      await addTrophy(trophy);
      refreshTrophies();
      closeForm();
      toast.success('Trophy saved successfully!');
    } else {
      toast.error('Please provide all required fields before submitting.');
    }
  };

  const updateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && trophyData) {
      await updateTrophy(trophyData._id as string, trophy);
      refreshTrophies();
      closeForm();
      toast.success('Trophy updated successfully!');
    } else {
      toast.error('Please provide all required fields before submitting.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">
        {isEdit ? 'Edit Trophy' : 'Upload Trophy'}
      </h2>
      <form onSubmit={!isEdit ? submitHandler : updateHandler} className="mt-4">
        <label className="block" htmlFor="Trophy_image">
          <div className="flex gap-3 items-center mt-2">
            <FaRegImage /> Select Trophy Image
          </div>
          <input
            type="file"
            name="Trophy_image"
            onChange={handleFileChange}
            id="Trophy_image"
            className="w-full border border-gray-300 rounded-lg p-2 hidden"
          />
        </label>

        <div className="mt-4">
          {trophy.image_url ? (
            <img
              src={trophy.image_url}
              alt="Trophy"
              className="h-24 w-24 object-cover"
            />
          ) : (
            <div className="text-gray-500">No Trophy uploaded yet.</div>
          )}
        </div>

        <label htmlFor="name" className="block mt-4">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            value={trophy.name}
            onChange={handleInputChange}
            id="name"
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
            placeholder="Enter a valid URL"
          />
        </label>

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={closeForm}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Trophy
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default TrophyForm;
