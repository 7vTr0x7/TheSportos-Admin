import React, { useEffect, useState } from 'react';
import MatchList from '../../components/Fixtures/MatchList';
import { fetchMatches } from '../../apis/admin';

const ScheduledFixtures: React.FC = () => {
  const [scheduledMatches, setScheduledMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetchMatches(setScheduledMatches, 'Upcoming');
  }, []);

  return (
    <div>
      <MatchList matches={scheduledMatches} />
    </div>
  );
};

export default ScheduledFixtures;
