import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../auth/auth";
import { login } from "../store/authSlice";

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  // Fetch User Profile Once
  useEffect(() => {
    if (userData) {
      fetchUserProfile();
    }
  }, []); // Run only once on mount

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await authService.getCurrentUser();
      const profileData = response.data.user;

      dispatch(login(profileData)); // Update Redux state

      await fetchFollowersData(profileData.followers || []);
      await fetchFollowingData(profileData.following || []);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowersData = async (followerIds) => {
    try {
      const followersPromises = followerIds.map((id) => authService.getUserById(id));
      const followersResponses = await Promise.all(followersPromises);
      setFollowersData(followersResponses.map((res) => res.data.user));
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowingData = async (followingIds) => {
    try {
      const followingPromises = followingIds.map((id) => authService.getUserById(id));
      const followingResponses = await Promise.all(followingPromises);
      setFollowingData(followingResponses.map((res) => res.data.user));
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await authService.followUser(userId);
      fetchUserProfile(); // Refresh after follow
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await authService.unfollowUser(userId);
      fetchUserProfile(); // Refresh after unfollow
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading profile...</p>;
  if (!userData) return <p className="text-center text-gray-600">User not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{userData.username}'s Profile</h2>
      <img src={userData.pfp} alt={userData.username} className="w-24 h-24 rounded-full mx-auto border" />
      <p className="text-center text-gray-700 mt-2">{userData.email}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Followers</h3>
        <ul>
          {followersData.length === 0 ? (
            <p className="text-gray-500">No followers</p>
          ) : (
            followersData.map((user) => (
              <li key={user.id} className="text-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={user.pfp} alt={user.username} className="w-10 h-10 rounded-full border" />
                  <span>{user.username} (ID: {user.id})</span>
                </div>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleFollow(user.id)}
                >
                  Follow Back
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Following</h3>
        <ul>
          {followingData.length === 0 ? (
            <p className="text-gray-500">Not following anyone</p>
          ) : (
            followingData.map((user) => (
              <li key={user.id} className="text-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={user.pfp} alt={user.username} className="w-10 h-10 rounded-full border" />
                  <span>{user.username} (ID: {user.id})</span>
                </div>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleUnfollow(user.id)}
                >
                  Unfollow
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
