import React, { useEffect } from 'react';
import MatchList from '../../components/Fixtures/MatchList';
import { useMatchContext } from '../../components/MatchProvider';

const ScheduledFixtures: React.FC = () => {
  const { scheduledMatches, refreshMatches } = useMatchContext();

  useEffect(() => {
    refreshMatches(); // Ensure data is loaded on mount
  }, [refreshMatches]);

  return (
    <div>
      <MatchList matches={scheduledMatches} />
    </div>
  );
};

export default ScheduledFixtures;
