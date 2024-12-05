import React, { useEffect, useState } from 'react';
import MatchList from '../../components/Fixtures/MatchList';
import { fetchMatches } from '../../apis/admin';

const CompletedFixtures: React.FC = () => {
  const [completedMatches, setCompletedMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetchMatches(setCompletedMatches, 'Completed');
  }, []);

  return (
    <div>
      <MatchList matches={completedMatches} />
    </div>
  );
};

export default CompletedFixtures;
