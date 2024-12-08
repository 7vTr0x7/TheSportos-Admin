import React, { useEffect } from 'react';
import MatchList from '../../components/Fixtures/MatchList';
import { useMatchContext } from '../../components/MatchProvider';

const LiveFixtures: React.FC = () => {
  const { liveMatches, refreshMatches } = useMatchContext();

  useEffect(() => {
    refreshMatches();
  }, [refreshMatches]);
  return (
    <div>
      <MatchList matches={liveMatches} />
    </div>
  );
};

export default LiveFixtures;
