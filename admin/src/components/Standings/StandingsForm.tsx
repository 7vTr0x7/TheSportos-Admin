import React, { useEffect, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Standing } from '../../types/standing';
import { addStanding, updateStanding } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';

type StandingsFormProps = {
  closeForm: () => void;
  isEdit?: boolean;
  standing?: Standing;
};

const StandingsForm: React.FC<StandingsFormProps> = ({
  closeForm,
  isEdit,
  standing,
}) => {
  const [formState, setFormState] = useState<Standing>({
    club: '',
    imageUrl: '',
    league: '',
    position: 0,
    played: '',
    won: 0,
    drawn: 0,
    lost: 0,
    goals: '',
    last5: [],
    points: 0,
  });

  useEffect(() => {
    if (isEdit && standing) {
      setFormState(standing);
    }
  }, [isEdit, standing]);

  const { refreshStandings } = useMatchContext();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.loading('Uploading image...');
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'thesportos'); // Replace with your Cloudinary upload preset

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
        setFormState((prev) => ({
          ...prev,
          imageUrl: data.secure_url,
        }));
        toast.dismiss();
        toast.success('Image uploaded successfully!');
      } catch (error) {
        toast.dismiss();
        toast.error('Image upload failed.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = Object.values(formState).every((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return value !== null && value !== undefined;
    });

    if (!isFormValid) {
      toast.error('Please fill in all fields.');
      return;
    }

    const loadingToast = toast.loading('Submitting form...');
    try {
      if (isEdit) {
        await updateStanding(standing?._id, formState);
      } else {
        await addStanding(formState);
      }
      refreshStandings();
      toast.dismiss(loadingToast);
      toast.success('Form submitted successfully!');
      closeForm();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Form submission failed.');
    }
  };

  const handleAddResult = (result: string) => {
    if (formState.last5.length < 5) {
      setFormState((prev) => ({
        ...prev,
        last5: [...prev.last5, result],
      }));
    }
  };

  const handleRemoveResult = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      last5: prev.last5.filter((_, i) => i !== index),
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 h-[70vh] overflow-y-auto"
    >
      <div>
        <label htmlFor="club">Club Name</label>
        <input
          type="text"
          id="club"
          name="club"
          value={formState.club}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="league">League</label>
        <input
          type="text"
          id="league"
          name="league"
          value={formState.league}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="position">Position</label>
        <input
          type="number"
          id="position"
          name="position"
          value={formState.position}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="played">Played</label>
        <input
          type="number"
          id="played"
          name="played"
          value={formState.played}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="won">Won</label>
        <input
          type="number"
          id="won"
          name="won"
          value={formState.won}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="drawn">Drawn</label>
        <input
          type="number"
          id="drawn"
          name="drawn"
          value={formState.drawn}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="lost">Lost</label>
        <input
          type="number"
          id="lost"
          name="lost"
          value={formState.lost}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="goals">Goals</label>
        <input
          type="text"
          id="goals"
          name="goals"
          placeholder="Ex. 3:2"
          value={formState.goals}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="points">Points</label>
        <input
          type="number"
          id="points"
          name="points"
          value={formState.points}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="last5">Last 5 Results</label>
        <div className="flex space-x-2">
          {['W', 'D', 'L'].map((result) => (
            <button
              type="button"
              key={result}
              onClick={() => handleAddResult(result)}
              className="border p-2 rounded-lg"
              disabled={formState.last5.length >= 5}
            >
              {result}
            </button>
          ))}
        </div>
        <div className="mt-2">
          {formState.last5.map((result, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-2">{result}</span>
              <button
                type="button"
                onClick={() => handleRemoveResult(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="image">Club Logo</label>
        <input
          type="file"
          id="image"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="image"
          className="block cursor-pointer flex gap-3 items-center mt-2"
        >
          <FaRegImage /> Select Club Logo
        </label>
        {formState.imageUrl && (
          <img src={formState.imageUrl} alt="Club Logo" className="h-20 mt-2" />
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default StandingsForm;
