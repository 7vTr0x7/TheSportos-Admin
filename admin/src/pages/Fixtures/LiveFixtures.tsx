import React, { useEffect, useState } from 'react';
import MatchList from '../../components/Fixtures/MatchList';
import { fetchMatches } from '../../apis/admin';

const LiveFixtures: React.FC = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetchMatches(setLiveMatches, 'Live');
  }, []);

  return (
    <div>
      <MatchList matches={liveMatches} />
    </div>
  );
};

export default LiveFixtures;
