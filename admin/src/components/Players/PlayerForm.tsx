import React, { useEffect, useState } from 'react';
import { RecentFixture, SinglePlayer, TeamStats } from '../../types/player';
import { addPlayer, updatePlayer } from '../../apis/admin';
import toast from 'react-hot-toast';
import { useMatchContext } from '../MatchProvider';

interface PlayerFormProps {
  isEdit?: boolean;
  playerData?: SinglePlayer;
  closeForm: () => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({
  isEdit,
  playerData,
  closeForm,
}) => {
  const [player, setPlayer] = useState<SinglePlayer>({
    name: '',
    flagImageUrl: '',
    imageUrl: '',
    number: 0,
    country: '',
    position: '',
    playerProfile: {
      dateOfBirth: new Date(),
      preferredFoot: 'Right',
      location: '',
      preferredPosition: '',
    },
    teamsPlayedFor: [],
    recentFixtures: [],
  });

  const { refreshPlayers } = useMatchContext();

  useEffect(() => {
    if (isEdit && playerData) {
      setPlayer(playerData);
    }
  }, [isEdit, playerData]);

  const handleRecentFixtureChange = (
    index: number,
    key: keyof RecentFixture | 'score',
    value: any,
  ) => {
    const updatedRecentFixtures = [...player.recentFixtures!];
    if (key === 'score') {
      updatedRecentFixtures[index] = {
        ...updatedRecentFixtures[index],
        score: { ...updatedRecentFixtures[index].score, ...value },
      };
    } else {
      updatedRecentFixtures[index] = {
        ...updatedRecentFixtures[index],
        [key]: value,
      };
    }
    setPlayer((prev) => ({ ...prev, recentFixtures: updatedRecentFixtures }));
  };

  const addFixture = () => {
    const newFixture: RecentFixture = {
      competition: '',
      league_logo_url: '',
      date: new Date().toISOString(),
      stadium: '',
      team1: { name: '', logo_url: '' },
      team2: { name: '', logo_url: '' },
      status: '',
      score: { team1: 0, team2: 0 },
      FT: false,
    };

    setPlayer((prev) => ({
      ...prev,
      recentFixtures: [...(prev.recentFixtures || []), newFixture],
    }));
  };

  const removeFixture = (index: number) => {
    const updatedRecentFixtures = player.recentFixtures?.filter(
      (_, i) => i !== index,
    );
    setPlayer((prev) => ({
      ...prev,
      recentFixtures: updatedRecentFixtures,
    }));
  };

  const handleChange = (key: keyof SinglePlayer, value: any) => {
    setPlayer((prev) => ({ ...prev, [key]: value }));
  };

  const handleNestedChange = (
    key: keyof SinglePlayer,
    nestedKey: string,
    value: any,
  ) => {
    if (
      key === 'playerProfile' &&
      typeof player[key] === 'object' &&
      player[key] !== null
    ) {
      setPlayer((prev) => ({
        ...prev,
        [key]: { ...prev[key], [nestedKey]: value },
      }));
    } else {
      console.error(`${key} is not a valid object key for nested updates`);
    }
  };

  const handleTeamsPlayedForChange = (
    index: number,
    key: keyof TeamStats | 'teamName' | 'startDate' | 'stats',
    value: any,
  ) => {
    const updatedTeams = [...player.teamsPlayedFor];
    if (key === 'stats') {
      updatedTeams[index] = {
        ...updatedTeams[index],
        stats: { ...updatedTeams[index].stats, ...value },
      };
    } else {
      updatedTeams[index] = { ...updatedTeams[index], [key]: value };
    }
    setPlayer((prev) => ({ ...prev, teamsPlayedFor: updatedTeams }));
  };

  const addTeam = () => {
    setPlayer((prev) => ({
      ...prev,
      teamsPlayedFor: [
        ...prev.teamsPlayedFor,
        {
          teamName: '',
          startDate: new Date(),
          stats: { played: 0, won: 0, drawn: 0, lost: 0 },
          imageUrl: '', // Add the missing imageUrl property here
        },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Get the player data (assuming `player` is the state holding the player data)
    const {
      name,
      flagImageUrl,
      imageUrl,
      number,
      country,
      position,
      playerProfile,
    } = player;
    const { dateOfBirth, preferredFoot, location, preferredPosition } =
      playerProfile;

    // Validate all required fields except teamsPlayedFor and recentFixtures
    if (
      !name ||
      !flagImageUrl ||
      !imageUrl ||
      !number ||
      !country ||
      !position ||
      !dateOfBirth ||
      !preferredFoot ||
      !location ||
      !preferredPosition
    ) {
      toast.error('Please fill in all required fields!');
      return;
    }

    // Show loading toast
    const toastId = toast.loading('Submitting player data...');

    try {
      await addPlayer(player);
      refreshPlayers(); // Refresh data for all components

      closeForm();
      toast.success('Match data submitted successfully!', {
        id: toastId,
      });
    } catch (error) {
      toast.error('Error submitting match data.', { id: toastId });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      name,
      flagImageUrl,
      imageUrl,
      number,
      country,
      position,
      playerProfile,
    } = player;
    const { dateOfBirth, preferredFoot, location, preferredPosition } =
      playerProfile;

    // Validate all required fields except teamsPlayedFor and recentFixtures
    if (
      !name ||
      !flagImageUrl ||
      !imageUrl ||
      !number ||
      !country ||
      !position ||
      !dateOfBirth ||
      !preferredFoot ||
      !location ||
      !preferredPosition
    ) {
      toast.error('Please fill in all required fields!');
      return;
    }

    // Show loading toast
    const toastId = toast.loading('Updating player data...');

    try {
      await updatePlayer(playerData?._id as string, player);
      refreshPlayers(); // Refresh data for all components

      closeForm();
      toast.success('Match data updated successfully!', {
        id: toastId,
      });
    } catch (error) {
      toast.error('Error updating match data.', { id: toastId });
    }
  };

  const removeTeam = (index: number) => {
    // Remove the team from the teamsPlayedFor array
    const updatedTeams = player.teamsPlayedFor.filter(
      (_, idx) => idx !== index,
    );

    // Update the state (assuming you're using setPlayer to update the player state)
    setPlayer((prevState) => ({
      ...prevState,
      teamsPlayedFor: updatedTeams,
    }));
  };

  const cloudinaryUrl =
    'https://api.cloudinary.com/v1_1/dbzzejye6/image/upload';
  const cloudinaryUploadPreset = 'thesportos'; // Replace with your Cloudinary preset

  // Function to upload image to Cloudinary using fetch
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryUploadPreset);

    // Show loading toast
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
      // Update toast to show success message
      toast.success('Image uploaded successfully!', { id: toastId });
      return data.secure_url; // Cloudinary URL for the uploaded image
    } catch (error) {
      // Update toast to show error message
      toast.error('Error uploading image', { id: toastId });
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  };

  // Modify the existing image upload functions to use Cloudinary with fetch and loading toast
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        try {
          // Call your function to upload the image to Cloudinary or your image hosting service
          const imageUrl = await uploadImageToCloudinary(file);
          console.log('Uploaded image URL:', imageUrl);

          // Update the state with the image URL
          setPlayer({ ...player, imageUrl });
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    }
  };

  const handleLeagueLogoUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Upload the logo to Cloudinary or your image storage service
        const imageUrl = await uploadImageToCloudinary(file); // Adjust this to your actual upload function
        const updatedFixtures = [...player.recentFixtures];
        updatedFixtures[index] = {
          ...updatedFixtures[index],
          league_logo_url: imageUrl, // Update with the uploaded image URL
        };
        setPlayer({ ...player, recentFixtures: updatedFixtures });
      } catch (error) {
        console.error('League logo upload failed:', error);
      }
    }
  };
  const handleFixtureImageUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
    teamKey: 'team1' | 'team2',
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        const updatedFixtures = [...player.recentFixtures];
        updatedFixtures[index] = {
          ...updatedFixtures[index],
          [teamKey]: {
            ...updatedFixtures[index][teamKey],
            logo_url: imageUrl, // Update with the Cloudinary image URL
          },
        };
        setPlayer({ ...player, recentFixtures: updatedFixtures });
      } catch (error) {
        console.error('Fixture image upload failed:', error);
      }
    }
  };

  const handleFlagImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setPlayer((prev) => ({
          ...prev,
          flagImageUrl: imageUrl, // Update with the Cloudinary image URL
        }));
      } catch (error) {
        console.error('Flag image upload failed:', error);
      }
    }
  };

  const handleTeamImageUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setPlayer((prev) => {
          const updatedTeams = [...prev.teamsPlayedFor];
          updatedTeams[index] = {
            ...updatedTeams[index],
            [field]: imageUrl, // Update with the Cloudinary image URL
          };
          return { ...prev, teamsPlayedFor: updatedTeams };
        });
      } catch (error) {
        console.error('Team image upload failed:', error);
      }
    }
  };

  return (
    <form
      onSubmit={!isEdit ? handleSubmit : handleUpdate}
      className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg h-[70vh] overflow-y-auto"
    >
      <h3 className="text-2xl font-bold mb-4">Player Form</h3>

      {/* Basic Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={player.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Number:</label>
          <input
            type="number"
            className="w-full border rounded-lg p-2"
            value={player.number}
            onChange={(e) => handleChange('number', parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={player.country}
            onChange={(e) => handleChange('country', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Position:</label>
          <select
            className="w-full border rounded-lg p-2"
            value={player.position}
            onChange={(e) => handleChange('position', e.target.value)}
          >
            <option value="">Select Position</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Forward">Forward</option>
          </select>
        </div>
      </div>

      {/* Flag Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Flag Image Upload:
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded-lg p-2"
          onChange={handleFlagImageUpload}
        />
        {player.flagImageUrl && (
          <div className="mt-2">
            <img
              src={player.flagImageUrl}
              alt="Uploaded"
              className="w-16 h-16 object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image Upload:</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded-lg p-2"
          onChange={handleImageUpload}
        />
        {player.imageUrl && (
          <div className="mt-2">
            <img
              src={player.imageUrl}
              alt="Uploaded"
              className="w-16 h-16 object-cover"
            />
          </div>
        )}
      </div>

      {/* Player Profile Section */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-2">Player Profile</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth:
            </label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              value={
                player.playerProfile.dateOfBirth
                  ? new Date(player.playerProfile.dateOfBirth)
                      .toISOString()
                      .split('T')[0]
                  : ''
              }
              onChange={(e) =>
                handleNestedChange(
                  'playerProfile',
                  'dateOfBirth',
                  new Date(e.target.value),
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Foot:
            </label>
            <select
              className="w-full border rounded-lg p-2"
              value={player.playerProfile.preferredFoot}
              onChange={(e) =>
                handleNestedChange(
                  'playerProfile',
                  'preferredFoot',
                  e.target.value,
                )
              }
            >
              <option value="Left">Left</option>
              <option value="Right">Right</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location:</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={player.playerProfile.location}
              onChange={(e) =>
                handleNestedChange('playerProfile', 'location', e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Position:
            </label>
            <select
              className="w-full border rounded-lg p-2"
              value={player.playerProfile.preferredPosition}
              onChange={(e) =>
                handleNestedChange(
                  'playerProfile',
                  'preferredPosition',
                  e.target.value,
                )
              }
            >
              <option value="">Select Preferred Position</option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>
          </div>
        </div>
      </div>
      {/* Teams Played For Section */}
      {/* Teams Played For Section */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-2">Teams Played For</h4>
        {player.teamsPlayedFor.map((team, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4">
            {/* Team Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Team Name:
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={team.teamName}
                onChange={(e) =>
                  handleTeamsPlayedForChange(index, 'teamName', e.target.value)
                }
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date:
              </label>
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                value={
                  team.startDate
                    ? new Date(team.startDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) =>
                  handleTeamsPlayedForChange(
                    index,
                    'startDate',
                    new Date(e.target.value),
                  )
                }
              />
            </div>

            {/* Stats - Played */}
            <div>
              <label className="block text-sm font-medium mb-1">Played:</label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={team.stats.played}
                onChange={(e) =>
                  handleTeamsPlayedForChange(index, 'stats', {
                    played: parseInt(e.target.value),
                  })
                }
              />
            </div>

            {/* Stats - Won */}
            <div>
              <label className="block text-sm font-medium mb-1">Won:</label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={team.stats.won}
                onChange={(e) =>
                  handleTeamsPlayedForChange(index, 'stats', {
                    won: parseInt(e.target.value),
                  })
                }
              />
            </div>

            {/* Stats - Drawn */}
            <div>
              <label className="block text-sm font-medium mb-1">Drawn:</label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={team.stats.drawn}
                onChange={(e) =>
                  handleTeamsPlayedForChange(index, 'stats', {
                    drawn: parseInt(e.target.value),
                  })
                }
              />
            </div>

            {/* Stats - Lost */}
            <div>
              <label className="block text-sm font-medium mb-1">Lost:</label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={team.stats.lost}
                onChange={(e) =>
                  handleTeamsPlayedForChange(index, 'stats', {
                    lost: parseInt(e.target.value),
                  })
                }
              />
            </div>

            {/* Image Upload for Team */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Team Image:
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg p-2"
                onChange={(e) =>
                  handleTeamImageUpload(index, e, 'teamImageUrl')
                }
              />
              {team.imageUrl && (
                <img
                  src={team.imageUrl}
                  alt="Team"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>

            {/* Remove Team Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => removeTeam(index)}
                className="bg-red-500 text-white rounded-lg px-4 py-2"
              >
                Remove Team
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addTeam}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
        >
          Add Team
        </button>
      </div>

      {/* Recent Fixtures Section */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-2">Recent Fixtures</h4>
        {player.recentFixtures?.map((fixture, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4">
            {/* Competition */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Competition:
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={fixture.competition}
                onChange={(e) =>
                  handleRecentFixtureChange(
                    index,
                    'competition',
                    e.target.value,
                  )
                }
              />
            </div>

            {/* League Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Select League Logo:
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg p-2"
                onChange={(e) => handleLeagueLogoUpload(index, e)}
              />
              {fixture.league_logo_url && (
                <img
                  src={fixture.league_logo_url}
                  alt="League Logo"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Date:</label>
              <input
                type="datetime-local"
                className="w-full border rounded-lg p-2"
                value={fixture.date}
                onChange={(e) =>
                  handleRecentFixtureChange(index, 'date', e.target.value)
                }
              />
            </div>

            {/* Stadium */}
            <div>
              <label className="block text-sm font-medium mb-1">Stadium:</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={fixture.stadium}
                onChange={(e) =>
                  handleRecentFixtureChange(index, 'stadium', e.target.value)
                }
              />
            </div>

            {/* Team 1 Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Team 1 Name:
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={fixture.team1.name}
                onChange={(e) =>
                  handleRecentFixtureChange(index, 'team1', {
                    ...fixture.team1,
                    name: e.target.value,
                  })
                }
              />
            </div>

            {/* Team 1 Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Team 1 Logo:
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg p-2"
                onChange={(e) => handleFixtureImageUpload(index, e, 'team1')}
              />
              {fixture.team1.logo_url && (
                <img
                  src={fixture.team1.logo_url}
                  alt="Team 1 Logo"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>

            {/* Team 2 Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Team 2 Name:
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={fixture.team2.name}
                onChange={(e) =>
                  handleRecentFixtureChange(index, 'team2', {
                    ...fixture.team2,
                    name: e.target.value,
                  })
                }
              />
            </div>

            {/* Team 2 Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Team 2 Logo:
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg p-2"
                onChange={(e) => handleFixtureImageUpload(index, e, 'team2')}
              />
              {fixture.team2.logo_url && (
                <img
                  src={fixture.team2.logo_url}
                  alt="Team 2 Logo"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>

            {/* Score */}
            <div>
              <label className="block text-sm font-medium mb-1">Score:</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-16 border rounded-lg p-2"
                  value={fixture.score.team1}
                  onChange={(e) =>
                    handleRecentFixtureChange(index, 'score', {
                      team1: parseInt(e.target.value),
                    })
                  }
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  className="w-16 border rounded-lg p-2"
                  value={fixture.score.team2}
                  onChange={(e) =>
                    handleRecentFixtureChange(index, 'score', {
                      team2: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeFixture(index)}
              className="bg-red-500 text-white rounded-lg px-4 py-2 mt-4"
            >
              Remove Fixture
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFixture}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
        >
          Add Fixture
        </button>
      </div>
      {/* Submit Button */}
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

export default PlayerForm;
