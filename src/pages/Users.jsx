import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../auth/auth";
import { login } from "../store/authSlice";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers();
  }, []); // Fetch only on initial mount

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await authService.getAllUsers();
      const fetchedUsers = res.data.users.filter((user) => userData ? user.id !== userData.id : true); // Conditional check

      // Ensure isFollowing is correctly set from current userData
      const updatedUsers = fetchedUsers.map((user) => ({
        ...user,
        isFollowing: userData?.following?.includes(user.id) || false,
      }));

      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const refetchCurrentUser = async () => {
    try {
      const updatedUserRes = await authService.getCurrentUser();
      const updatedUser = updatedUserRes.data.user;
      dispatch(login(updatedUser)); // Update Redux state immediately

      // Update UI state again after fetching new user data
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          isFollowing: updatedUser.following?.includes(user.id) || false,
        }))
      );
    } catch (error) {
      console.error("Error refetching current user:", error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await authService.followUser(userId);

      // Optimistically update UI
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isFollowing: true } : user
        )
      );

      // Re-fetch current user to get latest state from server
      await refetchCurrentUser();
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await authService.unfollowUser(userId);

      // Optimistically update UI
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isFollowing: false } : user
        )
      );

      // Re-fetch current user to get latest state from server
      await refetchCurrentUser();
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading users...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-3 border-b last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.pfp}
                alt={user.username}
                className="w-10 h-10 rounded-full border"
              />
              <span className="text-lg font-medium text-gray-700">
                {user.username}
              </span>
            </div>
            {user.isFollowing ? (
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow"
                onClick={() => handleUnfollow(user.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow"
                onClick={() => handleFollow(user.id)}
              >
                Follow
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;