import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddLeague from '../../components/Leagues/AddLeague';
import LeagueList from '../../components/Leagues/LeaguesList';

const Leagues: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Leagues" />

      <AddLeague />
      <LeagueList />
    </>
  );
};

export default Leagues;
