import React from "react";
import { useSelector } from "react-redux";

export const Profile = () => {
  const userData = useSelector((state) => state.auth.userData);

  if (!userData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h2>
      <div className="space-y-3">
        <p><strong>ID:</strong> {userData.id}</p>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Role:</strong> {userData.role}</p>
        <p><strong>Joined:</strong> {userData.created_at}</p>
      </div>
    </div>
  );
};
