import React, { useEffect, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import { Banner } from '../../types/banner';
import { addBanner, updateBanner } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';

type BannerFormProps = {
  closeForm: () => void;
  isEdit?: boolean;
  banner?: Banner;
};

const BannerForm: React.FC<BannerFormProps> = ({
  closeForm,
  isEdit,
  banner,
}) => {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const { refreshBanner } = useMatchContext();

  useEffect(() => {
    if (banner?.imageUrl && isEdit) {
      setBannerUrl(banner?.imageUrl);
    }
  }, [banner?.imageUrl, isEdit]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.loading('Uploading banner...', { id: 'uploading' }); // Start loading toast

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'thesportos'); // Set your Cloudinary upload preset here

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dbzzejye6/image/upload',
          {
            method: 'POST',
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        setBannerUrl(data.secure_url); // Cloudinary response contains the image URL

        toast.success('Banner uploaded successfully!', { id: 'uploading' }); // Show success toast
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading banner. Please try again.', {
          id: 'uploading',
        }); // Show error toast
      }
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bannerUrl) {
      await addBanner({ imageUrl: bannerUrl });
      refreshBanner();
      closeForm();
      toast.success('Banner saved successfully!');
    } else {
      toast.error('Please upload a banner image before submitting.');
    }
  };
  const updateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bannerUrl && banner) {
      await updateBanner(banner._id as string, { imageUrl: bannerUrl });
      refreshBanner();
      closeForm();
      toast.success('Banner Updated successfully!');
    } else {
      toast.error('Please upload a banner image before submitting.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">
        {isEdit ? 'Edit Banner' : 'Upload Banner'}
      </h2>
      <form onSubmit={!isEdit ? submitHandler : updateHandler} className="mt-4">
        <label className="block" htmlFor="banner_image">
          <div className="flex gap-3 items-center mt-2">
            <FaRegImage /> Select Banner Image
          </div>
          <input
            type="file"
            name="banner_image"
            onChange={handleFileChange}
            id="banner_image"
            className="w-full border border-gray-300 rounded-lg p-2 hidden"
          />
        </label>

        <div className="mt-4">
          {bannerUrl && bannerUrl !== 'https://placehold.co/100' ? (
            <img
              src={bannerUrl}
              alt="Banner"
              className="h-40 w-full object-cover"
            />
          ) : (
            <div className="text-gray-500">No banner uploaded yet.</div>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={closeForm}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Banner
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default BannerForm;
