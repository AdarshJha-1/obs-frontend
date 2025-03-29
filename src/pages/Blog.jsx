import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import { marked } from "marked";
import parse from "html-react-parser";
import blogService from "../blog/blog";
import { FaTrash, FaEdit, FaComment } from "react-icons/fa";

export default function Blog() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.user_id === userData.id : false;

    useEffect(() => {
        if (id) {
            blogService.getBlogById(id)
                .then((response) => {
                    if (response?.data?.blog) {
                        setPost(response.data.blog);
                    } else {
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching blog:", error);
                    navigate("/");
                });
        } else {
            navigate("/");
        }
    }, [id, navigate]);

    const deletePost = async () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await blogService.deleteBlog(id);
                navigate("/"); // Redirect to homepage after deletion
            } catch (error) {
                console.error("Error deleting blog:", error);
                alert("Failed to delete blog. Please try again.");
            }
        }
    };

    return post ? (
        <div className="py-12 bg-gray-50 min-h-screen">
            <Container>
                <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                    {/* Blog Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-extrabold text-gray-900">{post.title}</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Published on {new Date(post.created_at).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    {isAuthor && (
                        <div className="flex justify-end gap-3 mb-4">
                            <Link to={`/edit-post/${post.id}`} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                <FaEdit className="mr-2" /> Edit
                            </Link>
                            <button onClick={deletePost} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                                <FaTrash className="mr-2" /> Delete
                            </button>
                        </div>
                    )}

                    {/* Blog Content */}
                    <div className="prose max-w-none">
                        {parse(marked(post.content || ""))}
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                            <FaComment className="mr-2" /> Comments
                        </h2>
                        <div className="mt-3">
                            {post.comments.length > 0 ? (
                                post.comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-100 rounded-lg p-4 mb-3">
                                        <p className="text-gray-700">{comment.content}</p>
                                        <span className="text-xs text-gray-500">
                                            {new Date(comment.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No comments yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
