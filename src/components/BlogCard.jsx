import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import blogService from "../blog/blog";

function BlogCard({ id, title, views, created_at, comments, likes, author }) {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        // Set the initial view count from the views array length
        if (views && Array.isArray(views)) {
            setViewCount(views.length);
        }
    }, [views]);

    const handleBlogClick = async () => {
        try {
            // Make the API call to update the view for this blog
            const res = await blogService.updateView(id);
            console.log(res);
            
            // Increment the view count after successfully updating the view
            setViewCount(prevCount => prevCount + 1);
        } catch (error) {
            console.error("Error updating view:", error);
        }
    };

    return (
        <Link to={`/blog/${id}`} onClick={handleBlogClick} className="block w-full">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200">
                
                {/* Blog Meta: Author & Date */}
                <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-gray-700 font-medium">🖊️ {author || "Unknown Author"}</p>
                    <p className="text-xs text-gray-500">{new Date(created_at).toLocaleDateString()}</p>
                </div>

                {/* Blog Title */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h2>

                {/* Blog Stats */}
                <div className="flex items-center justify-start gap-4 text-gray-600 text-sm">
                    <span>❤️ {likes.length} Likes</span>
                    <span>💬 {comments.length} Comments</span>
                    <span>👀 {viewCount} Views</span>
                </div>
            </div>
        </Link>
    );
}

export default BlogCard;
