import React from 'react';

interface GoalsFieldsetProps {
  formState: Match;
  handleGoalChange: (
    team: 'team1' | 'team2',
    index: number,
    field: 'player' | 'assist',
    value: string,
  ) => void;
  handleAddGoal: (team: 'team1' | 'team2') => void;
  handleRemoveGoal: (team: 'team1' | 'team2', index: number) => void;
}

const GoalsFieldset: React.FC<GoalsFieldsetProps> = ({
  formState,
  handleGoalChange,
  handleAddGoal,
  handleRemoveGoal,
}) => {
  const { status, goals } = formState;

  if (status === 'Upcoming') return null;

  return (
    <fieldset className="mb-4 border p-4">
      <legend className="font-bold capitalize">Goals</legend>

      {/* Team 1 Goals */}
      <div>
        <h3 className="font-semibold text-gray-800">Team 1</h3>
        {goals.team1.map((goal, index) => (
          <div key={`team1-goal-${index}`} className="space-y-2">
            <label>
              Player:
              <input
                type="text"
                value={goal.player}
                onChange={(e) =>
                  handleGoalChange('team1', index, 'player', e.target.value)
                }
                className="w-full border p-2"
              />
            </label>
            <label>
              Assist:
              <input
                type="text"
                value={goal.assist}
                onChange={(e) =>
                  handleGoalChange('team1', index, 'assist', e.target.value)
                }
                className="w-full border p-2"
              />
            </label>
            <button
              type="button"
              onClick={() => handleRemoveGoal('team1', index)}
              className="text-red-500"
            >
              Remove Goal
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddGoal('team1')}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Add Goal for Team 1
        </button>
      </div>

      {/* Team 2 Goals */}
      <div>
        <h3 className="font-semibold text-gray-800">Team 2</h3>
        {goals.team2.map((goal, index) => (
          <div key={`team2-goal-${index}`} className="space-y-2">
            <label>
              Player:
              <input
                type="text"
                value={goal.player}
                onChange={(e) =>
                  handleGoalChange('team2', index, 'player', e.target.value)
                }
                className="w-full border p-2"
              />
            </label>
            <label>
              Assist:
              <input
                type="text"
                value={goal.assist}
                onChange={(e) =>
                  handleGoalChange('team2', index, 'assist', e.target.value)
                }
                className="w-full border p-2"
              />
            </label>
            <button
              type="button"
              onClick={() => handleRemoveGoal('team2', index)}
              className="text-red-500"
            >
              Remove Goal
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddGoal('team2')}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Add Goal for Team 2
        </button>
      </div>
    </fieldset>
  );
};

export default GoalsFieldset;
