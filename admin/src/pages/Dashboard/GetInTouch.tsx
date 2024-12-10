import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import UsersList from '../../components/GetInTouch/UsersList';

const GetInTouch: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Get In Touch" />
      <UsersList />
    </>
  );
};

export default GetInTouch;
