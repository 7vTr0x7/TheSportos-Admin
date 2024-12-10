import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import StandingsList from '../../components/Standings/StandingsList';
import AddStanding from '../../components/Standings/AddStanding';

const Standings: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Standings" />
      <AddStanding />
      <StandingsList />
    </>
  );
};

export default Standings;
