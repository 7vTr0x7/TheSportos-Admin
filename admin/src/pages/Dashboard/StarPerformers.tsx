import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddStarPerformer from '../../components/StarPerformers/AddStarPerformer';
import StarPerformersList from '../../components/StarPerformers/StarPerformersList';

const StarPerformers: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Star Performers" />

      <AddStarPerformer />
      <StarPerformersList />
    </>
  );
};

export default StarPerformers;
