import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ id, title, views, created_at, comments, likes }) {
  return (
    <Link to={`/blog/${id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-200">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
        
        {/* Stats (Likes, Views, Comments) */}
        <div className="flex justify-between text-sm text-gray-600">
          <p>❤️ {likes.length} Likes</p>
          <p>👀 {views} Views</p>
          <p>💬 {comments.length} Comments</p>
        </div>
        
        {/* Date */}
        <p className="text-xs text-gray-500 mt-2">
          📅 Published on {new Date(created_at).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default BlogCard;
