import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import NewsList from '../../components/News/NewsList';
import AddNews from '../../components/News/AddNews';

const News: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="News" />
      <AddNews />
      <NewsList />
    </>
  );
};

export default News;
