import React, { useEffect, useState } from 'react';
import { useMatchContext } from '../MatchProvider';
import BannerForm from './BannerForm';
import toast, { Toaster } from 'react-hot-toast';
import { deleteBanner } from '../../apis/admin';

const BannerList: React.FC = () => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const { banner, refreshBanner } = useMatchContext();

  useEffect(() => {
    refreshBanner();
  }, [refreshBanner]);

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting banner...');
    try {
      await deleteBanner(id);
      refreshBanner();
      toast.success('Banner deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete banner.', {
        id: deleteToast,
      });
    }
  };

  return (
    <div className="mt-4">
      {banner &&
        banner.map((ban) => (
          <div
            className="px-4 py-2 rounded-lg bg-gray-200 mb-3 flex items-center justify-between"
            key={ban._id}
          >
            <img
              alt={ban._id}
              src={ban.imageUrl}
              className="h-20 w-20 rounded-md"
            />

            <div className="flex items-center gap-5 ">
              <button onClick={() => setOpenFormId(ban._id)}>Edit</button>
              <button onClick={() => deleteHandler(ban._id as string)}>
                Delete
              </button>
            </div>

            {openFormId === ban._id && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => setOpenFormId(null)}
              >
                <div
                  className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                >
                  <BannerForm
                    closeForm={() => setOpenFormId(null)}
                    isEdit={true}
                    banner={ban}
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

export default BannerList;
