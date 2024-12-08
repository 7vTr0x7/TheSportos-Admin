import React, { useEffect, useState } from 'react';
import { useMatchContext } from '../MatchProvider';
import toast, { Toaster } from 'react-hot-toast';
import { deleteSponsor } from '../../apis/admin';
import SponsorForm from './SponsorForm';

const SponsorList: React.FC = () => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const { sponsor, refreshSponsor } = useMatchContext();

  useEffect(() => {
    refreshSponsor();
  }, [refreshSponsor]);

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting sponsor...');
    try {
      await deleteSponsor(id);
      refreshSponsor();
      toast.success('Sponsor deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete sponsor.', {
        id: deleteToast,
      });
    }
  };

  return (
    <div className="mt-4">
      {sponsor &&
        sponsor.map((spon) => (
          <div
            className="px-4 py-2 rounded-lg bg-gray-200 mb-3 flex items-center justify-between"
            key={spon._id}
          >
            <img
              alt={spon._id}
              src={spon.imageUrl}
              className="h-20 w-20 rounded-md"
            />

            <div className="flex items-center gap-5 ">
              <button onClick={() => setOpenFormId(spon._id)}>Edit</button>
              <button onClick={() => deleteHandler(spon._id as string)}>
                Delete
              </button>
            </div>

            {openFormId === spon._id && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => setOpenFormId(null)}
              >
                <div
                  className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                >
                  <SponsorForm
                    closeForm={() => setOpenFormId(null)}
                    isEdit={true}
                    sponsorData={spon}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      <Toaster />
    </div>
  );
};

export default SponsorList;
