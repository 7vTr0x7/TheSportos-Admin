import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddSponsor from '../../components/Sponsor/AddSponsor';
import SponsorList from '../../components/Sponsor/SponsorList';

const Sponsor: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Sponsor" />

      {/* <AddSponsor /> */}

      <SponsorList />
    </>
  );
};

export default Sponsor;
