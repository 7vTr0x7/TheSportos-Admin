import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaRegImage } from 'react-icons/fa';
import { Sponsor } from '../../types/sponsor';
import { useMatchContext } from '../MatchProvider';
import { addSponsor, updateSponsor } from '../../apis/admin';

type SponsorFormProps = {
  closeForm: () => void;
  isEdit?: boolean;
  sponsorData?: Sponsor;
};

const SponsorForm: React.FC<SponsorFormProps> = ({
  closeForm,
  isEdit,
  sponsorData,
}) => {
  const [sponsor, setSponsor] = useState<Sponsor>({
    imageUrl: '',
    linkUrl: '',
  });
  const { refreshSponsor } = useMatchContext();

  useEffect(() => {
    if (sponsorData && isEdit) {
      setSponsor(sponsorData);
    }
  }, [sponsorData, isEdit]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.loading('Uploading Sponsor...', { id: 'uploading' });

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'thesportos');

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
        setSponsor((prev) => ({ ...prev, imageUrl: data.secure_url }));

        toast.success('Sponsor uploaded successfully!', { id: 'uploading' });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading Sponsor. Please try again.', {
          id: 'uploading',
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSponsor((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sponsor.imageUrl && sponsor.linkUrl) {
      await addSponsor(sponsor);
      refreshSponsor();
      closeForm();
      toast.success('Sponsor saved successfully!');
    } else {
      toast.error('Please provide all required fields before submitting.');
    }
  };

  const updateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && sponsorData) {
      await updateSponsor(sponsorData._id as string, sponsor);
      refreshSponsor();
      closeForm();
      toast.success('Sponsor updated successfully!');
    } else {
      toast.error('Please provide all required fields before submitting.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">
        {isEdit ? 'Edit Sponsor' : 'Upload Sponsor'}
      </h2>
      <form onSubmit={!isEdit ? submitHandler : updateHandler} className="mt-4">
        <label className="block" htmlFor="Sponsor_image">
          <div className="flex gap-3 items-center mt-2">
            <FaRegImage /> Select Sponsor Image
          </div>
          <input
            type="file"
            name="Sponsor_image"
            onChange={handleFileChange}
            id="Sponsor_image"
            className="w-full border border-gray-300 rounded-lg p-2 hidden"
          />
        </label>

        <div className="mt-4">
          {sponsor.imageUrl ? (
            <img
              src={sponsor.imageUrl}
              alt="Sponsor"
              className="h-40 w-full object-cover"
            />
          ) : (
            <div className="text-gray-500">No Sponsor uploaded yet.</div>
          )}
        </div>

        <label htmlFor="linkUrl" className="block mt-4">
          <span className="text-gray-700">Link URL:</span>
          <input
            type="url"
            name="linkUrl"
            value={sponsor.linkUrl}
            onChange={handleInputChange}
            id="linkUrl"
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
            placeholder="Enter a valid URL"
          />
        </label>

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
            Save Sponsor
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default SponsorForm;
