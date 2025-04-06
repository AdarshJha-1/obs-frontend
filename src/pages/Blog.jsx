import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "../components";
import { useSelector } from "react-redux";
import { marked } from "marked";
import parse from "html-react-parser";
import blogService from "../blog/blog";
import { FaTrash, FaEdit, FaComment, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import commentService  from "../comment/comment";

export default function Blog() {
	const [blog, setBlog] = useState(null);
	const [blogUser, setBlogUser] = useState(null);
	const [newComment, setNewComment] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const userData = useSelector((state) => state.auth.userData);
	
	const isAuthor = blog && userData ? blog.user_id === userData.id : false;

	useEffect(() => {
		if (id) {
			blogService.getBlogById(id)
				.then((response) => {
					if (response?.data?.blog) {
						setBlog(response.data.blog);
						setBlogUser(response.data.user);
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


	const deleteComment = async (commentId, userId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
        try {
            await commentService.deleteComment(commentId, userId);
            setBlog((prev) => ({
                ...prev,
                comments: prev.comments.filter((comment) => comment.id !== commentId),
            }));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }
};

	return blog ? (
		<div className="py-12 bg-gray-50 min-h-screen">
			<Container>
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

					{/* Left Side - Blog Content */}
					<div className="lg:col-span-2 bg-white p-8 shadow-lg rounded-lg relative">

						{/* Blog Header */}
						<div className="flex justify-between items-start">
							<div>
								<h1 className="text-3xl font-extrabold text-gray-900">{blog.title}</h1>
								<p className="text-gray-500 text-sm mt-1">
									Published on {new Date(blog.created_at).toLocaleDateString()}
								</p>
							</div>

							{/* Three-Dot Menu for Edit/Delete */}
							{isAuthor && (
								<div className="relative">
									<button
										className="text-gray-600 hover:text-gray-800 p-2"
										onClick={() => setShowMenu(!showMenu)}
									>
										&#8942;
									</button>
									{showMenu && (
										<div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-md rounded-lg">
											<Link
												to={`/edit-blog/${blog.id}`}
												className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
											>
												<FaEdit className="inline-block mr-2 text-sm" /> Edit
											</Link>
											<button
												onClick={deleteBlog}
												className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
											>
												<FaTrash className="inline-block mr-2 text-sm" /> Delete
											</button>
										</div>
									)}
								</div>
							)}
						</div>

{/* Author Profile */}
							<div className="flex items-center gap-2">
								<img src={blogUser.pfp} alt="Profile" className="w-10 h-10 rounded-full" />
								<p className="text-gray-700 font-semibold">{blogUser.username}</p>
							</div>
						{/* Like & Dislike Buttons (Top Right) */}
						<div className="flex items-center mt-4 gap-3">
							<button onClick={() => handleLike()} className="flex items-center text-gray-600 hover:text-green-500">
								<FaThumbsUp className="mr-1 text-lg" /> ({blog.likes.length})
							</button>
							<button onClick={handleDislike} className="flex items-center text-gray-600 hover:text-red-500">
								<FaThumbsDown className="mr-1 text-lg" />
							</button>
						</div>

						{/* Blog Content */}
						<div className="prose max-w-none mt-4">
							{parse(marked(blog.content || ""))}
						</div>

					</div>

					{/* Right Side - Comments Section */}
					<div className="bg-gray-50 p-6 rounded-lg shadow-lg h-fit">

						{/* Add Comment */}
						{userData && (
							<div className="mb-6">
								<h2 className="text-xl font-semibold text-gray-800 mb-3">Add a Comment</h2>
								<textarea
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
									className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
									rows="3"
									placeholder="Write your comment..."
								/>
								<button
									onClick={addComment}
									className="mt-4 bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition w-full"
								>
									Add Comment
								</button>
							</div>
						)}

						{/* Comments List */}
						<div className="max-h-[500px] overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
								<FaComment className="text-blue-600" /> Comments
							</h2>
							<div className="space-y-5">
								{blog.comments.length > 0 ? (
									blog.comments.map((comment) => (
										<div
											key={comment.id}
											className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-2"
										>
											<p className="text-gray-700">{comment.content}</p>
											<div className="flex justify-between items-center text-xs text-gray-500">
												<span>{new Date(comment.created_at).toLocaleString()}</span>
												{userData?.id === comment.user_id && (
													<button
														onClick={() => deleteComment(comment.id, comment.user_id)}
														className="text-red-500 hover:text-red-700 flex items-center gap-1"
													>
														<FaTrash className="text-sm" /> Delete
													</button>
												)}
											</div>
										</div>
									))
								) : (
									<p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
								)}
							</div>
						</div>

					</div>

				</div>
			</Container>
		</div>
	) : null;

}