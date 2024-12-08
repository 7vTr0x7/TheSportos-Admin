import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { ILeague } from '../../types/league';
import { addLeague, updateLeague } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';
import { FaRegImage } from 'react-icons/fa';

interface LeagueFormProps {
  closeForm: () => void;
  isEdit?: boolean;
  league?: ILeague;
}

const LeagueForm: React.FC<LeagueFormProps> = ({
  closeForm,
  isEdit,
  league,
}) => {
  const [formData, setFormData] = useState<ILeague>({
    league: '',
    logo_url: '',
    start_date: new Date(),
    end_date: new Date(),
    views: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { refreshLeagues } = useMatchContext();

  useEffect(() => {
    if (isEdit && league) {
      setFormData(league);
    }
  }, [isEdit, league]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === 'start_date' || name === 'end_date' ? new Date(value) : value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'thesportos'); // Replace with your Cloudinary upload preset
      formData.append('cloud_name', 'dbzzejye6');

      const toastId = toast.loading('Uploading image...');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dbzzejye6/image/upload',
          {
            method: 'POST',
            body: formData,
          },
        );

        if (!response.ok) throw new Error('Image upload failed');

        const data = await response.json();
        toast.dismiss(toastId);
        toast.success('Image uploaded successfully!');

        // Update the form state with the uploaded image URL
        setFormData((prevState) => ({
          ...prevState,
          logo_url: data.secure_url,
        }));
      } catch (error) {
        toast.dismiss(toastId);
        toast.error('Failed to upload image.');
      }
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.end_date &&
      formData.league &&
      formData.logo_url &&
      formData.start_date &&
      formData.views
    ) {
      console.log(formData);
      await addLeague(formData);
      refreshLeagues();
      closeForm();
      toast.success('League saved successfully!');
    } else {
      toast.error('Please provide all required fields before submitting.');
    }
  };

  const updateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && league) {
      await updateLeague(league._id as string, formData);
      refreshLeagues();
      closeForm();
      toast.success('League updated successfully!');
    } else {
      toast.error('Please provide all required fields before submitting.');
    }
  };

  return (
    <div className="league-form max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg h-[70vh] overflow-y-auto">
      <form
        onSubmit={isEdit ? updateHandler : submitHandler}
        className="space-y-6"
      >
        <div className="form-group">
          <label
            htmlFor="league"
            className="block text-sm font-medium text-gray-700"
          >
            League Name
          </label>
          <input
            type="text"
            id="league"
            name="league"
            value={formData.league}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <label className="block" htmlFor="team2_logo">
          <div className="flex gap-3 items-center mt-2">
            <FaRegImage /> Select Image
          </div>
          <input
            type="file"
            name="team2_logo"
            onChange={handleFileChange}
            id="team2_logo"
            className="w-full border border-gray-300 rounded-lg p-2 hidden"
          />
        </label>

        <div>
          {formData?.logo_url &&
            formData?.logo_url !== 'https://placehold.co/100' && (
              <img alt="Team 2 Logo" src={formData.logo_url} className="h-20" />
            )}
        </div>

        <div className="form-group">
          <label
            htmlFor="start_date"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date.toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="end_date"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date.toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="views"
            className="block text-sm font-medium text-gray-700"
          >
            Views
          </label>
          <input
            type="number"
            id="views"
            name="views"
            value={formData.views}
            onChange={handleInputChange}
            min={0}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          {isEdit ? 'Update League' : 'Create League'}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default LeagueForm;
