import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddTrophy from '../../components/Trophies/AddTrophy';
import TrophiesList from '../../components/Trophies/TrophiesList';

const Trophies: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Trophies" />

      <AddTrophy />

      <TrophiesList />
    </>
  );
};

export default Trophies;
