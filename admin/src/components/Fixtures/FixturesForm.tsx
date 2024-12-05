import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegImage } from 'react-icons/fa';

interface FixturesFormProps {
  closeForm: () => void;
}

const FixturesForm: React.FC<FixturesFormProps> = ({ closeForm }) => {
  const [formState, setFormState] = useState<Match>({
    competition: '',
    league_logo_url: '',
    date: '',
    month: '',
    stadium: '',
    team1: { name: '', logo_url: '' },
    team2: { name: '', logo_url: '' },
    status: '',
    FT: false,
    score: { team1: 0, team2: 0 },
    penalties: false,
    pens: { team1: 0, team2: 0 },
    timeLeft: {},
    matchType: '',
    headToHead: {
      played: 0,
      wins: { team1: 0, team2: 0 },
      homeWins: { team1: 0, team2: 0 },
      awayWins: { team1: 0, team2: 0 },
    },
    previousResult: {
      team1: { name: '', score: 0 },
      team2: { name: '', score: 0 },
    },
    teamLineup: {
      team1: { name: '', lineup: [] },
      team2: { name: '', lineup: [] },
    },
    goals: { team1: [], team2: [] },
    bestDefender: '',
    bestMidfielder: '',
    featuredPlayer: undefined,
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    text: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show loading toast
    const loadingToast = toast.loading('Uploading image...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'thesportos'); // Replace with your preset

      // Upload the file to Cloudinary
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dbzzejye6/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Error uploading image');
      }

      const data = await response.json();
      const uploadedImageUrl = data.secure_url;

      // Show success toast
      toast.success('Image uploaded successfully!');
      console.log('Image uploaded:', uploadedImageUrl);

      // Update the form state with the uploaded image URL
      setFormState((prev: Match) => ({
        ...prev,
        [text]: uploadedImageUrl,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      // Show error toast
      toast.error('Error uploading image!');
    } finally {
      // Remove the loading toast
      toast.dismiss(loadingToast);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setFormState((prevState) => {
      if (name.includes('.')) {
        const [parentKey, childKey] = name.split('.');

        // Explicitly typing parentKey and childKey to ensure safety
        return {
          ...prevState,
          [parentKey as keyof Match]: {
            ...(prevState[parentKey as keyof Match] as object),
            [childKey]:
              type === 'checkbox'
                ? (event.target as HTMLInputElement).checked
                : value,
          },
        };
      } else {
        return {
          ...prevState,
          [name]:
            type === 'checkbox'
              ? (event.target as HTMLInputElement).checked
              : value,
        };
      }
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitted Match Data:', formState);
    closeForm();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="overflow-y-auto h-[70vh] p-4 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Fill Match Data
        </h2>
        <div className="space-y-4">
          {/* Competition */}
          <label className="block">
            League:
            <input
              type="text"
              name="competition"
              value={formState.competition}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </label>

          {/* League Logo URL */}
          <label className="block" id="logoImage">
            <div className="flex gap-3 items-center">
              <FaRegImage /> Select League Logo{' '}
            </div>
            <input
              type="file"
              name="league_logo_url"
              onChange={(e) => handleFileChange(e, 'league_logo_url')}
              id="logoImage"
              className="w-full border border-gray-300 rounded-lg p-2 hidden"
            />
          </label>
          <div>
            {formState?.league_logo_url && (
              <img
                alt={formState.competition}
                src={formState.league_logo_url}
                className="h-20"
              />
            )}
          </div>

          {/* Date */}
          <label className="block">
            Date:
            <input
              type="date"
              name="date"
              value={formState.date}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </label>

          {/* Month */}
          <label className="block">
            Month:
            <input
              type="text"
              name="month"
              value={formState.month}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </label>

          {/* Stadium */}
          <label className="block">
            Stadium:
            <input
              type="text"
              name="stadium"
              value={formState.stadium}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </label>

          {/* Team 1 */}
          <fieldset>
            <legend className="font-bold text-gray-800">Team 1</legend>
            <label className="block">
              Name:
              <input
                type="text"
                name="team1.name"
                value={formState.team1.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block">
              Logo URL:
              <input
                type="url"
                name="team1.logo_url"
                value={formState.team1.logo_url}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
          </fieldset>

          {/* Team 2 */}
          <fieldset>
            <legend className="font-bold text-gray-800">Team 2</legend>
            <label className="block">
              Name:
              <input
                type="text"
                name="team2.name"
                value={formState.team2.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block">
              Logo URL:
              <input
                type="url"
                name="team2.logo_url"
                value={formState.team2.logo_url}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
          </fieldset>

          {/* Match Status */}
          <label className="block">
            Status:
            <select
              name="status"
              value={formState.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Status</option>
              <option value="Live">Live</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </label>

          {/* Full Time & Penalty Checkbox */}
          <label className="block">
            FT (Full Time):
            <input
              type="checkbox"
              name="FT"
              checked={formState.FT}
              onChange={handleInputChange}
            />
          </label>
          <label className="block">
            Penalties:
            <input
              type="checkbox"
              name="penalties"
              checked={formState.penalties}
              onChange={handleInputChange}
            />
          </label>

          {/* Conditional Rendering Based on Status */}
          {formState.status !== 'Upcoming' && (
            <>
              {/* Goals */}
              <fieldset>
                <legend className="font-bold text-gray-800">Goals</legend>
                <label className="block">
                  Team 1:
                  <input
                    type="number"
                    name="score.team1"
                    value={formState.score.team1}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </label>
                <label className="block">
                  Team 2:
                  <input
                    type="number"
                    name="score.team2"
                    value={formState.score.team2}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </label>
              </fieldset>
              {/* Penalties */}
              {formState.penalties && (
                <fieldset>
                  <legend className="font-bold text-gray-800">Penalties</legend>
                  <label className="block">
                    Team 1:
                    <input
                      type="number"
                      name="pens.team1"
                      value={formState.pens.team1}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </label>
                  <label className="block">
                    Team 2:
                    <input
                      type="number"
                      name="pens.team2"
                      value={formState.pens.team2}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </label>
                </fieldset>
              )}
            </>
          )}

          {/* Match Type */}
          <label className="block">
            Match Type:
            <input
              type="text"
              name="matchType"
              value={formState.matchType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </label>
        </div>

        {/* Submit and Cancel Buttons */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={closeForm}
          className="w-full mt-2 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default FixturesForm;
