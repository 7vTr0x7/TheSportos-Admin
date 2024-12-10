import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { deleteLeague, deleteNews } from '../../apis/admin';
import { useMatchContext } from '../MatchProvider';
import NewsForm from './NewsForm';

const NewsList: React.FC = () => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const { news, refreshNews } = useMatchContext();

  useEffect(() => {
    refreshNews();
  }, [refreshNews]);

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting News...');
    try {
      await deleteNews(id);
      refreshNews();
      toast.success('News deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete News.', {
        id: deleteToast,
      });
    }
  };

  return (
    <div className="mt-4">
      {news &&
        news.map((news) => (
          <div
            className="px-4 py-2 rounded-lg bg-gray-200 mb-3 flex items-center justify-between"
            key={news._id}
          >
            <div className="flex items-center gap-5">
              <img
                alt={news._id}
                src={news.image_url}
                className="h-16 w-24 rounded-md"
              />

              <p>{news.title}</p>
            </div>

            <div className="flex items-center gap-5 ">
              <button onClick={() => setOpenFormId(news._id)}>Edit</button>
              <button onClick={() => deleteHandler(news._id as string)}>
                Delete
              </button>
            </div>

            {openFormId === news._id && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => setOpenFormId(null)}
              >
                <div
                  className="bg-white w-full max-w-lg mx-auto p-4 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                >
                  <NewsForm
                    closeForm={() => setOpenFormId(null)}
                    isEdit={true}
                    news={news}
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

export default NewsList;
