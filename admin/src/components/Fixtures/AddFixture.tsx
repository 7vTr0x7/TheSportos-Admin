import React, { useState } from 'react';
import FixturesForm from './FixturesForm';
import { Toaster } from 'react-hot-toast';

const AddFixture: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => setIsFormOpen(true)}
        >
          Add Fixture
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
            <FixturesForm closeForm={closeForm} />
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default AddFixture;
