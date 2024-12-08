import React, { useEffect } from 'react';
import MatchList from '../../components/Fixtures/MatchList';
import { useMatchContext } from '../../components/MatchProvider';

const CompletedFixtures: React.FC = () => {
  const { completedMatches, refreshMatches } = useMatchContext();

  useEffect(() => {
    refreshMatches();
  }, [refreshMatches]);

  return (
    <div>
      <MatchList matches={completedMatches} />
    </div>
  );
};

export default CompletedFixtures;
