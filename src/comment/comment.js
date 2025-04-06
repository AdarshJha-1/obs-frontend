import axios from "axios";

export class CommentService {
	constructor() {
		this.api = axios.create({
			baseURL: (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080') + '/api/comment',

			headers: {
				"Content-Type": "application/json"
			},
			withCredentials: true,
		});
	}

	// Delete a comment by ID
	async deleteComment(commentId, userId) {
		try {
            const res = this.api.delete("/",  { data: {comment_id: commentId, user_id: userId}})
			return res.data;
		} catch (error) {
			throw error.response?.data || error.message;
		}
	}
}


// Create an instance of BlogService
const commentService = new CommentService();

export default commentService;
