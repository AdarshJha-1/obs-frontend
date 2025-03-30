import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "../components";
import { useSelector } from "react-redux";
import { marked } from "marked";
import parse from "html-react-parser";
import blogService from "../blog/blog";
import { FaTrash, FaEdit, FaComment, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function Blog() {
	const [blog, setBlog] = useState(null);
	const [newComment, setNewComment] = useState("");
	const [likes, setLikes] = useState(0);
	const { id } = useParams();
	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth.userData);
	const isAuthor = blog && userData ? blog.user_id === userData.id : false;



	useEffect(() => {
		if (id) {
			blogService.getBlogById(id)
				.then((response) => {
					if (response?.data?.blog) {
						setBlog(response.data.blog);
						setLikes(response.data.blog.likes.length)
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

	const deleteBlog = async () => {
		if (window.confirm("Are you sure you want to delete this blog?")) {
			try {
				await blogService.deleteBlog(id);
				navigate("/");
			} catch (error) {
				console.error("Error deleting blog:", error);
				alert("Failed to delete blog. Please try again.");
			}
		}
	};

	const handleLike = async () => {
		console.log("clikc:");
		
		console.log(blog.id);
		try {
			const res = await blogService.likeBlog(blog.id);
			if (res.success) {
			setBlog((prev) => ({ ...prev, likes: [...prev.likes, { user_id: userData.id }] }));
			}
		} catch (error) {
			console.error("Error liking blog:", error);
		}
	};

	const handleDislike = async () => {
		try {
			await blogService.dislikeBlog(id);
			setBlog((prev) => ({ ...prev, likes: prev.likes.filter(like => like.user_id !== userData.id) }));
		} catch (error) {
			console.error("Error disliking blog:", error);
		}
	};

	const addComment = async () => {
		if (!newComment.trim()) return;
		try {
			const response = await blogService.addComment(id, newComment);
			setBlog((prev) => ({ ...prev, comments: [...prev.comments, response.data.comment] }));
			setNewComment("");
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};

	return blog ? (
		<div className="py-12 bg-gray-50 min-h-screen">
			<Container>
				<div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
					{/* Blog Header */}
					<div className="mb-6">
						<h1 className="text-3xl font-extrabold text-gray-900">{blog.title}</h1>
						<p className="text-gray-500 text-sm mt-1">
							Published on {new Date(blog.created_at).toLocaleDateString()}
						</p>
					</div>

					{/* Action Buttons */}
					{isAuthor && (
						<div className="flex justify-end gap-3 mb-4">
							<Link to={`/edit-blog/${blog.id}`} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
								<FaEdit className="mr-2" /> Edit
							</Link>
							<button onClick={deleteBlog} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
								<FaTrash className="mr-2" /> Delete
							</button>
						</div>
					)}

					{/* Blog Content */}
					<div className="prose max-w-none">
						{parse(marked(blog.content || ""))}
					</div>

					{/* Like & Dislike Buttons */}
					<div className="flex items-center mt-4 gap-3">
						<button onClick={() => handleLike()} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
							<FaThumbsUp className="mr-2" /> Like ({blog.likes.length})
						</button>
						<button onClick={handleDislike} className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
							<FaThumbsDown className="mr-2" /> Dislike
						</button>
					</div>

					{/* Comments Section */}
					<div className="mt-8">
						<h2 className="text-xl font-semibold text-gray-800 flex items-center">
							<FaComment className="mr-2" /> Comments
						</h2>
						<div className="mt-3">
							{blog.comments.length > 0 ? (
								blog.comments.map((comment) => (
									<div key={comment.id} className="bg-gray-100 rounded-lg p-4 mb-3">
										<p className="text-gray-700">{comment.content}</p>
										<span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
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