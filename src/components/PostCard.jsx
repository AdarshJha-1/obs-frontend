import React from "react";
import { Link } from "react-router-dom";

function PostCard({ id, title, views, created_at, comments }) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-200">
        <div className="w-full justify-center mb-4"></div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">Views: {views}</p>
        <p className="text-sm text-gray-600">
          Comments: {comments.length}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Published on {new Date(created_at).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
