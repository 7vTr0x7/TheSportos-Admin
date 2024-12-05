import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LiveFixtures from '../Fixtures/LiveFixtures';
import ScheduledFixtures from '../Fixtures/ScheduledFixtures';
import CompletedFixtures from '../Fixtures/CompletedFixtures';
import AddFixture from '../../components/Fixtures/AddFixture';
import { Toaster } from 'react-hot-toast';

const Fixtures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<String>('live');

  return (
    <>
      <Breadcrumb pageName="Fixtures" />

      <AddFixture />

      <ul className="mt-3 flex items-center gap-5">
        <li
          className="cursor-pointer bg-gray-200 px-4  py-1 rounded-lg"
          onClick={() => setActiveTab('live')}
        >
          Live
        </li>
        <li
          className="cursor-pointer bg-gray-200 px-4  py-1 rounded-lg"
          onClick={() => setActiveTab('scheduled')}
        >
          Scheduled
        </li>
        <li
          className="cursor-pointer bg-gray-200 px-4  py-1 rounded-lg"
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </li>
      </ul>

      <div className="my-5">
        {activeTab === 'live' && <LiveFixtures />}
        {activeTab === 'scheduled' && <ScheduledFixtures />}
        {activeTab === 'completed' && <CompletedFixtures />}
      </div>
      <Toaster />
    </>
  );
};

export default Fixtures;
