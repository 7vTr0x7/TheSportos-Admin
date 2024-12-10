import React, { useEffect, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { INews } from '../../types/news';
import { addNews, updateNews } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';

type NewsFormProps = {
  closeForm: () => void;
  isEdit?: boolean;
  news?: INews;
};

const NewsForm: React.FC<NewsFormProps> = ({ closeForm, isEdit, news }) => {
  const [blogData, setBlogData] = useState<INews>({
    category: '',
    date: new Date(),
    title: '',
    introductionPara: '',
    description: '',
    image_url: '',
    by: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { refreshNews } = useMatchContext();

  useEffect(() => {
    if (news && isEdit) {
      setBlogData({
        ...news,
        date: new Date(news.date), // Ensure date is a Date object
      });
    }
  }, [news, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: name === 'date' ? new Date(value) : value, // Parse 'date' field explicitly
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show loading toast
    toast.loading('Uploading image...', { id: 'upload' });
    setLoading(true);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'thesportos'); // Use your Cloudinary upload preset
      formData.append('cloud_name', 'dbzzejye6'); // Use your Cloudinary cloud name

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dbzzejye6/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      const imageUrl = data.secure_url; // Cloudinary returns the image URL

      // Set the image URL in the form
      setBlogData((prevState) => ({
        ...prevState,
        image_url: imageUrl,
      }));

      // Show success toast
      toast.success('Image uploaded successfully!', { id: 'upload' });
    } catch (error) {
      toast.error('Error uploading image', { id: 'upload' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      blogData.image_url &&
      blogData.by &&
      blogData.category &&
      blogData.date &&
      blogData.description &&
      blogData.title &&
      blogData.introductionPara
    ) {
      if (isEdit) {
        await updateNews(news?._id, blogData);
      } else {
        await addNews(blogData);
      }

      refreshNews();
      closeForm();
      toast.success('News saved successfully!');
    } else {
      toast.error('Please provide all required fields before submitting.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto space-y-6 h-[70vh] overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {isEdit ? 'Edit News' : 'Create News'}
      </h2>

      {/* Category Field */}
      <div className="flex flex-col">
        <label htmlFor="category" className="text-gray-700 font-semibold mb-2">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={blogData.category}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Date Field */}
      <div className="flex flex-col">
        <label htmlFor="date" className="text-gray-700 font-semibold mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={
            blogData.date instanceof Date
              ? blogData.date.toISOString().split('T')[0]
              : ''
          }
          onChange={(e) =>
            setBlogData((prevState) => ({
              ...prevState,
              date: new Date(e.target.value),
            }))
          }
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Title Field */}
      <div className="flex flex-col">
        <label htmlFor="title" className="text-gray-700 font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={blogData.title}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Introduction Paragraph Field */}
      <div className="flex flex-col">
        <label
          htmlFor="introductionPara"
          className="text-gray-700 font-semibold mb-2"
        >
          Introduction Paragraph
        </label>
        <textarea
          id="introductionPara"
          name="introductionPara"
          value={blogData.introductionPara}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        ></textarea>
      </div>

      {/* Description Field */}
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="text-gray-700 font-semibold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={10}
          value={blogData.description}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        ></textarea>
      </div>

      {/* Image Upload Field */}
      <div className="flex flex-col">
        <label htmlFor="image_url" className="text-gray-700 font-semibold mb-2">
          Image Upload
        </label>
        <div className="flex items-center space-x-3">
          <FaRegImage className="text-gray-500" />
          <input
            type="file"
            name="image_url"
            id="image_url"
            onChange={handleFileChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hidden"
          />
          <button
            type="button"
            onClick={() => document.getElementById('image_url')?.click()}
            className=" text-black"
          >
            Select Image
          </button>
        </div>
        {blogData.image_url && (
          <div className="mt-3">
            <img
              src={blogData.image_url}
              alt="Selected preview"
              className="h-20 rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      {/* Author Field */}
      <div className="flex flex-col">
        <label htmlFor="by" className="text-gray-700 font-semibold mb-2">
          By
        </label>
        <input
          type="text"
          id="by"
          name="by"
          value={blogData.by}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {loading ? 'Submitting...' : 'Submit Blog'}
      </button>
    </form>
  );
};

export default NewsForm;
