import React, { useState } from 'react';
import PlayerForm from './PlayerForm';
import { Toaster } from 'react-hot-toast';

const AddPlayer: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const closeForm = () => {
    setIsFormOpen(false);
  };
  return (
    <>
      <div className="flex justify-end">
        <button
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-lg"
          onClick={() => setIsFormOpen(true)}
        >
          Add Player
        </button>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeForm}
        >
          <div
            className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
          >
            <PlayerForm closeForm={closeForm} />
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default AddPlayer;
