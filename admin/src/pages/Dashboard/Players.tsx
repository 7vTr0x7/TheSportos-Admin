import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PlayersList from '../../components/Players/PlayersList';
import AddPlayer from '../../components/Players/AddPlayer';

const Players: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('forward');

  return (
    <>
      <Breadcrumb pageName="Players" />

      <AddPlayer />

      <ul className="mt-3 flex items-center gap-5 mb-3">
        <li
          className="cursor-pointer bg-gray-200 px-4  py-1 rounded-lg shadow-lg"
          onClick={() => setActiveTab('forward')}
        >
          Forward
        </li>
        <li
          className="cursor-pointer bg-gray-200 px-4  py-1 rounded-lg shadow-lg"
          onClick={() => setActiveTab('midfielder')}
        >
          Midfielder
        </li>
        <li
          className="cursor-pointer bg-gray-200 px-4  py-1 rounded-lg shadow-lg"
          onClick={() => setActiveTab('defender')}
        >
          Defender
        </li>
        <li
          className="cursor-pointer bg-gray-200 px-4  py-1 rounded-lg shadow-lg"
          onClick={() => setActiveTab('goalkeeper')}
        >
          Goalkeeper
        </li>
      </ul>

      <PlayersList position={activeTab} />
    </>
  );
};

export default Players;
