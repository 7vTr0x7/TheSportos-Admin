import React from 'react';

type Matches = {
  matches: Match[];
};

const MatchList: React.FC<Matches> = ({ matches }) => {
  return (
    <div>
      {matches?.length > 0 ? (
        matches.map((match: Match) => (
          <div
            key={match._id}
            className="flex items-center justify-between rounded-md bg-gray-200 px-5 py-2"
          >
            <div className="flex items-center gap-5 ">
              <div>{match.team1.name}</div>
              <p>vs</p>
              <div>{match.team2.name}</div>
            </div>
            <div className="flex items-center gap-5 ">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>Match Found</p>
      )}
    </div>
  );
};

export default MatchList;
