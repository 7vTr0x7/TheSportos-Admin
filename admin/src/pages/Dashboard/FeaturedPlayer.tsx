import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddFeaturedPlayer from '../../components/FeaturedPlayer/AddFeaturedPlayer';
import FeaturedPlayersList from '../../components/FeaturedPlayer/FeaturedPlayersList';

const FeaturedPlayer: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="FeaturedPlayer" />

      {/* <AddFeaturedPlayer /> */}

      <FeaturedPlayersList />
    </>
  );
};

export default FeaturedPlayer;
