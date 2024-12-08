import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddBanner from '../../components/Banner/AddBanner';
import BannerList from '../../components/Banner/BannerList';

const Banner: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Banner" />

      <AddBanner />

      <BannerList />
    </>
  );
};

export default Banner;
