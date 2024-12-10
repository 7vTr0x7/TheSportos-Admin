import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { deleteUserById } from '../../apis/admin';
import { IUser } from '../../types/user';

const UsersList: React.FC = () => {
  const [user, setUser] = useState<IUser[]>([]);

  const apiUrl = 'https://the-sportos-v1.vercel.app';

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://the-sportos-v1.vercel.app/api/admin/get/all/users',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch users: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (data.success && data.users) {
        setUser(data.users);
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (error) {
      console.error('Error fetching live users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    const socket = io(apiUrl, { transports: ['websocket', 'polling'] });

    socket.on('dataUpdated', () => {
      console.log('Banner data updated, refreshing...');
      fetchUsers();
    });

    return () => {
      socket.disconnect();
    };
  }, [apiUrl]);

  const deleteHandler = async (id: string) => {
    const deleteToast = toast.loading('Deleting user...');
    try {
      await deleteUserById(id);
      toast.success('User deleted successfully!', {
        id: deleteToast,
      });
    } catch (error) {
      toast.error('Failed to delete user.', {
        id: deleteToast,
      });
    }
  };

  return (
    <div className="mt-4">
      {user?.length > 0 ? (
        user.map((user) => (
          <div
            className="px-4 py-2 rounded-lg bg-gray-200 mb-3 flex items-center justify-between"
            key={user._id}
          >
            <div className="flex gap-5 items-center">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.phoneNumber}</p>
            </div>

            <div className="flex items-center gap-5 ">
              <button onClick={() => deleteHandler(user._id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No User Found</p>
      )}
      <Toaster />
    </div>
  );
};

export default UsersList;
