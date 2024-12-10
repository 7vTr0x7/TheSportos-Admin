import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegImage } from 'react-icons/fa';
import { addMatch, updateMatch } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';
import GoalsFieldset from './GoalsFieldset';
import TeamLineupFieldset from './TeamLineupFieldset';
import { FeaturedPlayer, Match } from '../../types/fixture';

type NestedKeys =
  | 'team1.logo_url'
  | 'team2.logo_url'
  | 'featuredPlayer.imageUrl';
type TopLevelKeys = 'league_logo_url';
type ValidKeys = NestedKeys | TopLevelKeys;

interface FixturesFormProps {
  closeForm: () => void;
  isEdit?: boolean;
  match?: Match;
}

const FixturesForm: React.FC<FixturesFormProps> = ({
  closeForm,
  isEdit,
  match,
}) => {
  const [formState, setFormState] = useState<Match>({
    competition: '',
    league_logo_url: 'https://placehold.co/100',
    date: '',
    stadium: '',
    time: '',
    team1: { name: '', logo_url: 'https://placehold.co/100' },
    team2: { name: '', logo_url: 'https://placehold.co/100' },
    status: '',
    FT: true,
    score: { team1: 0, team2: 0 },
    penalties: false,
    pens: { team1: 0, team2: 0 },
    timeLeft: {
      daysLeft: 0,
      hoursLeft: 0,
    },
    matchType: '',
    headToHead: {
      played: 0,
      wins: { team1: 0, team2: 0 },
      homeWins: { team1: 0, team2: 0 },
      awayWins: { team1: 0, team2: 0 },
    },
    previousResult: {
      team1: { score: 0 },
      team2: { score: 0 },
    },
    teamLineup: {
      team1: { lineup: [] },
      team2: { lineup: [] },
    },
    goals: { team1: [], team2: [] },
    bestDefender: '',
    bestMidfielder: '',
    featuredPlayer: {
      name: '',
      imageUrl: 'https://placehold.co/400',
      club: '',
      stats: {
        goals: '',
        assists: '',
        rank: '',
      },
      position: '',
    },
  });

  useEffect(() => {
    if (isEdit && match) {
      setFormState(match);
    }
  }, [isEdit, match]);

  const { refreshMatches } = useMatchContext();

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    text: ValidKeys,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Uploading...');

    try {
      // Create form data for the file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'thesportos'); // Replace with your Cloudinary upload preset
      formData.append('cloud_name', 'dbzzejye6'); // Replace with your Cloudinary cloud name

      // Use fetch to upload the file to Cloudinary
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dbzzejye6/image/upload', // Cloudinary upload URL
        {
          method: 'POST',
          body: formData,
        },
      );

      // Check for a successful response
      if (!response.ok) {
        throw new Error('File upload failed.');
      }

      const data = await response.json();
      const uploadedImageUrl = data.secure_url; // Get the URL of the uploaded image
      console.log(uploadedImageUrl);
      // Update form state with the uploaded image URL
      setFormState((prev: Match) => {
        if (text.includes('.')) {
          const [teamKey, property] = text.split('.') as [keyof Match, string];
          return {
            ...prev,
            [teamKey]: {
              ...(prev[teamKey] as Record<string, unknown>),
              [property]: uploadedImageUrl,
            },
          };
        } else {
          return {
            ...prev,
            [text]: uploadedImageUrl,
          };
        }
      });

      toast.success('File uploaded successfully!', { id: toastId });
    } catch (error) {
      toast.error('File upload failed.', { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setFormState((prevState) => {
      if (name.includes('.')) {
        const [parentKey, childKey, subKey] = name.split('.');

        if (subKey) {
          // Three-level nesting
          return {
            ...prevState,
            [parentKey]: {
              ...(prevState[parentKey] as object),
              [childKey]: {
                ...(prevState[parentKey][childKey] as object),
                [subKey]:
                  type === 'checkbox'
                    ? (event.target as HTMLInputElement).checked
                    : value,
              },
            },
          };
        } else {
          // Two-level nesting
          return {
            ...prevState,
            [parentKey]: {
              ...(prevState[parentKey] as object),
              [childKey]:
                type === 'checkbox'
                  ? (event.target as HTMLInputElement).checked
                  : value,
            },
          };
        }
      } else if (name === 'daysLeft' || name === 'hoursLeft') {
        // Handle `timeLeft` updates
        return {
          ...prevState,
          timeLeft: {
            ...prevState.timeLeft,
            [name]: value,
          },
        };
      } else {
        // Single-level updates
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleGoalChange = (
    team: 'team1' | 'team2',
    index: number,
    field: 'player' | 'assist',
    value: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      goals: {
        ...(prev.goals || { team1: [], team2: [] }), // Handle undefined by initializing if necessary
        [team]: (prev.goals?.[team] || []).map((goal, idx) =>
          idx === index ? { ...goal, [field]: value } : goal,
        ),
      },
    }));
  };

  const handleAddGoal = (team: 'team1' | 'team2') => {
    setFormState((prevState) => {
      const updatedGoals = {
        team1: [...(prevState.goals?.team1 ?? [])],
        team2: [...(prevState.goals?.team2 ?? [])],
      };

      // Add a new goal with empty properties
      updatedGoals[team].push({ player: '', assist: '' });

      return {
        ...prevState,
        goals: updatedGoals,
      };
    });
  };

  const handleRemoveGoal = (team: 'team1' | 'team2', index: number) => {
    setFormState((prevState) => {
      const updatedGoals = {
        team1: (prevState.goals?.team1 ?? []).filter((_, i) => i !== index),
        team2: (prevState.goals?.team2 ?? []).filter((_, i) => i !== index),
      };

      return {
        ...prevState,
        goals: updatedGoals,
      };
    });
  };

  const handleAddPlayer = (team: 'team1' | 'team2') => {
    setFormState((prev) => ({
      ...prev,
      teamLineup: {
        ...prev.teamLineup,
        [team]: {
          ...prev.teamLineup[team],
          lineup: [
            ...prev.teamLineup[team].lineup,
            { number: 0, name: '', position: '', imageUrl: '' },
          ],
        },
      },
    }));
  };

  const handleRemovePlayer = (team: 'team1' | 'team2', index: number) => {
    setFormState((prev) => ({
      ...prev,
      teamLineup: {
        ...prev.teamLineup,
        [team]: {
          ...prev.teamLineup[team],
          lineup: prev.teamLineup[team].lineup.filter((_, i) => i !== index),
        },
      },
    }));
  };
  const handlePlayerChange = (
    team: 'team1' | 'team2',
    index: number,
    key: keyof Player,
    value: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      teamLineup: {
        ...prev.teamLineup,
        [team]: {
          ...prev.teamLineup[team],
          lineup: prev.teamLineup[team].lineup.map((player, i) =>
            i === index ? { ...player, [key]: value } : player,
          ),
        },
      },
    }));
  };

  const handleFeaturedPlayerChange = (
    key: keyof FeaturedPlayer | 'stats',
    value: string | FeaturedPlayer['stats'],
  ) => {
    setFormState((prev) => ({
      ...prev,
      featuredPlayer: {
        ...(prev.featuredPlayer as FeaturedPlayer),
        [key]:
          key === 'stats'
            ? {
                ...prev.featuredPlayer?.stats,
                ...(value as FeaturedPlayer['stats']),
              }
            : value,
      },
    }));
  };

  // Handlers for Best Defender and Midfielder
  const handleBestPlayerChange = (
    key: 'bestDefender' | 'bestMidfielder',
    value: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      formState?.competition &&
      formState?.date &&
      formState?.stadium &&
      formState?.team1?.name &&
      formState?.team2?.name &&
      formState?.status &&
      formState?.matchType &&
      formState?.teamLineup?.team1?.lineup.length > 0 &&
      formState?.teamLineup?.team2?.lineup.length > 0
    ) {
      // Show loading toast
      const loadingToast = toast.loading('Submitting match data...');

      try {
        console.log(formState);
        await addMatch(formState);
        refreshMatches(); // Refresh data for all components

        closeForm();
        toast.success('Match data submitted successfully!', {
          id: loadingToast,
        });
      } catch (error) {
        toast.error('Error submitting match data.', { id: loadingToast });
      }
    } else {
      alert('Please fill all the required fields.');
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formState && isEdit && match) {
      // Show loading toast
      const loadingToast = toast.loading('Submitting match data...');

      try {
        await updateMatch(match._id, formState);
        refreshMatches();

        closeForm();
        toast.success('Match data updated successfully!', {
          id: loadingToast,
        });
      } catch (error) {
        toast.error('Error updating match data.', { id: loadingToast });
      }
    } else {
      alert('Please fill all the required fields.');
    }
  };

  return (
    <div>
      <form
        onSubmit={!isEdit ? handleSubmit : handleUpdate}
        className="overflow-y-auto h-[70vh] p-4 bg-white rounded-lg shadow-lg w-[100%]"
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
          <label className="block" htmlFor="leagueLogo">
            <div className="flex gap-3 items-center">
              <FaRegImage /> Select League Logo{' '}
            </div>
            <input
              type="file"
              name="league_logo"
              onChange={(e) => handleFileChange(e, 'league_logo_url')}
              id="leagueLogo"
              className="w-full border border-gray-300 rounded-lg p-2 hidden"
            />
          </label>
          <div>
            {formState?.league_logo_url &&
              formState?.league_logo_url !== 'https://placehold.co/100' && (
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
            <label className="block" htmlFor="team1_logo">
              <div className="flex gap-3 items-center mt-2">
                <FaRegImage /> Select Team1 Logo{' '}
              </div>
              <input
                type="file"
                name="team1_logo"
                onChange={(e) => handleFileChange(e, 'team1.logo_url')}
                id="team1_logo"
                className="w-full border border-gray-300 rounded-lg p-2 hidden"
              />
            </label>
            <div>
              {formState?.team1.logo_url &&
                formState?.team1.logo_url !== 'https://placehold.co/100' && (
                  <img
                    alt={formState.competition}
                    src={formState.team1.logo_url}
                    className="h-20"
                  />
                )}
            </div>
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
            <label className="block" htmlFor="team2_logo">
              <div className="flex gap-3 items-center mt-2">
                <FaRegImage /> Select Team2 Logo{' '}
              </div>
              <input
                type="file"
                name="team2_logo"
                onChange={(e) => handleFileChange(e, 'team2.logo_url')}
                id="team2_logo"
                className="w-full border border-gray-300 rounded-lg p-2 hidden"
              />
            </label>
            <div>
              {formState?.team2.logo_url &&
                formState?.team2.logo_url !== 'https://placehold.co/100' && (
                  <img
                    alt={formState.competition}
                    src={formState.team2.logo_url}
                    className="h-20"
                  />
                )}
            </div>
          </fieldset>

          {/* Match Status */}
          <label className="block" htmlFor="status">
            Status:
            <select
              name="status"
              id="status"
              value={formState.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="Live">Live</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </label>
          {formState.status === 'Upcoming' && (
            <>
              <label className="block" htmlFor="time">
                MatchTime
                <input
                  type="text"
                  name="time"
                  id="time"
                  placeholder="Ex. 3:00 PM"
                  value={formState.time}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </label>

              <fieldset>
                <legend className="font-bold text-gray-800">Time Left</legend>

                <label className="block" htmlFor="daysLeft">
                  Days Left
                  <input
                    type="number"
                    name="daysLeft"
                    id="daysLeft"
                    placeholder="Ex. 3"
                    value={formState.timeLeft.daysLeft}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </label>
                <label className="block" htmlFor="hoursLeft">
                  Hours Left
                  <input
                    type="number"
                    name="hoursLeft"
                    id="hoursLeft"
                    placeholder="Ex. 9"
                    value={formState.timeLeft.hoursLeft}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </label>
              </fieldset>
            </>
          )}

          {/* Match Type */}
          <label className="block">
            Match Type:
            <input
              type="text"
              name="matchType"
              placeholder="Ex. Playoff"
              value={formState.matchType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
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
              <label className="block">
                Penalties:
                <input
                  type="checkbox"
                  name="penalties"
                  checked={formState.penalties}
                  onChange={handleInputChange}
                />
              </label>
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

              <GoalsFieldset
                formState={formState}
                handleGoalChange={handleGoalChange}
                handleAddGoal={handleAddGoal}
                handleRemoveGoal={handleRemoveGoal}
              />
            </>
          )}

          <TeamLineupFieldset
            team="team1"
            lineup={formState.teamLineup.team1.lineup}
            handleAddPlayer={handleAddPlayer}
            handleRemovePlayer={handleRemovePlayer}
            handlePlayerChange={handlePlayerChange}
          />

          <TeamLineupFieldset
            team="team2"
            lineup={formState.teamLineup.team2.lineup}
            handleAddPlayer={handleAddPlayer}
            handleRemovePlayer={handleRemovePlayer}
            handlePlayerChange={handlePlayerChange}
          />

          <fieldset>
            <legend className="font-bold text-gray-800">Head-To-Head</legend>
            <label className="block" id="played">
              Match Played
              <input
                type="number"
                name="headToHead.played"
                value={formState.headToHead.played}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>

            <legend className="font-semibold text-gray-800">Wins</legend>
            <label className="block" id="team1Wins">
              Team 1:
              <input
                type="number"
                name="headToHead.wins.team1"
                value={formState.headToHead.wins.team1}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block" id="team2Wins">
              Team 2:
              <input
                type="number"
                name="headToHead.wins.team2"
                value={formState.headToHead.wins.team2}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>

            <legend className="font-semibold text-gray-800">Away Wins</legend>
            <label className="block" id="team1AwayWins">
              Team 1:
              <input
                type="number"
                name="headToHead.awayWins.team1"
                value={formState.headToHead.awayWins.team1}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block" id="team2AwayWins">
              Team 2:
              <input
                type="number"
                name="headToHead.awayWins.team2"
                value={formState.headToHead.awayWins.team2}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>

            <legend className="font-semibold text-gray-800">Home Wins</legend>
            <label className="block" id="team1HomeWins">
              Team 1:
              <input
                type="number"
                name="headToHead.homeWins.team1"
                value={formState.headToHead.homeWins.team1}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block" id="team2HomeWins">
              Team 2:
              <input
                type="number"
                name="headToHead.homeWins.team2"
                value={formState.headToHead.homeWins.team2}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
          </fieldset>

          <fieldset>
            <legend className="font-semibold text-gray-800">
              Previous Result
            </legend>
            <label className="block" id="prevTeam1">
              Team 1:
              <input
                type="number"
                name="previousResult.team1.score"
                value={formState.previousResult.team1.score}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block" id="prevTeam2">
              Team 2:
              <input
                type="number"
                name="previousResult.team2.score"
                value={formState.previousResult.team2.score}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
          </fieldset>

          {formState.status === 'Completed' && (
            <>
              {/* Best Defender and Best Midfielder */}
              <fieldset className="border p-4">
                <legend className="font-bold">Best Players</legend>
                <div className="space-y-4">
                  <label className="block">
                    Best Defender:
                    <input
                      type="text"
                      value={formState.bestDefender}
                      onChange={(e) =>
                        handleBestPlayerChange('bestDefender', e.target.value)
                      }
                      className="w-full border p-2"
                    />
                  </label>
                  <label className="block">
                    Best Midfielder:
                    <input
                      type="text"
                      value={formState.bestMidfielder}
                      onChange={(e) =>
                        handleBestPlayerChange('bestMidfielder', e.target.value)
                      }
                      className="w-full border p-2"
                    />
                  </label>
                </div>
              </fieldset>

              {/* Featured Player */}
              <fieldset className="border p-4">
                <legend className="font-bold">Featured Player</legend>
                <div className="space-y-4">
                  <label className="block">
                    Name:
                    <input
                      type="text"
                      value={formState.featuredPlayer?.name || ''}
                      onChange={(e) =>
                        handleFeaturedPlayerChange('name', e.target.value)
                      }
                      className="w-full border p-2"
                    />
                  </label>
                  <label className="block" htmlFor="featPlayer">
                    <div className="flex gap-3 items-center mt-2">
                      <FaRegImage /> Select image{' '}
                    </div>
                    <input
                      type="file"
                      name="featPlayer"
                      onChange={(e) =>
                        handleFileChange(e, 'featuredPlayer.imageUrl')
                      }
                      id="featPlayer"
                      className="w-full border border-gray-300 rounded-lg p-2 hidden"
                    />
                  </label>
                  <div>
                    {formState?.featuredPlayer?.imageUrl &&
                      formState?.featuredPlayer?.imageUrl !==
                        'https://placehold.co/400' && (
                        <img
                          alt={formState.featuredPlayer.name}
                          src={formState?.featuredPlayer?.imageUrl}
                          className="h-20"
                        />
                      )}
                  </div>
                  <label className="block">
                    Club:
                    <input
                      type="text"
                      value={formState.featuredPlayer?.club || ''}
                      onChange={(e) =>
                        handleFeaturedPlayerChange('club', e.target.value)
                      }
                      className="w-full border p-2"
                    />
                  </label>
                  <label className="block">
                    Position:
                    <select
                      value={formState.featuredPlayer?.position || ''}
                      onChange={(e) =>
                        handleFeaturedPlayerChange('position', e.target.value)
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

                  <div className="grid grid-cols-3 max-w-[80%]">
                    <label>
                      Goals:
                      <input
                        type="text"
                        value={formState.featuredPlayer?.stats.goals || ''}
                        onChange={(e) =>
                          handleFeaturedPlayerChange('stats', {
                            ...formState.featuredPlayer.stats,
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
                        value={formState.featuredPlayer?.stats.assists || ''}
                        onChange={(e) =>
                          handleFeaturedPlayerChange('stats', {
                            ...formState.featuredPlayer.stats,
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
                        value={formState.featuredPlayer?.stats.rank || ''}
                        onChange={(e) =>
                          handleFeaturedPlayerChange('stats', {
                            ...formState.featuredPlayer.stats,
                            rank: e.target.value,
                          })
                        }
                        className="border p-2"
                      />
                    </label>
                  </div>
                </div>
              </fieldset>
            </>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
        {!isEdit ? (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4"
          >
            Submit
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4"
          >
            Update
          </button>
        )}
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
