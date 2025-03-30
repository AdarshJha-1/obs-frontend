import axios from "axios";

export class BlogService {
	constructor() {
		this.api = axios.create({
			baseURL: "http://localhost:8080/api/blog",  // Ensure it matches backend
			headers: {
				"Content-Type": "application/json"
			},
			withCredentials: true,
		});
	}

	// Fetch all blogs
	async getAllBlogs() {
		try {
			const res = await this.api.get("/all");
			return res.data;
		} catch (error) {
			throw error.response?.data || error.message;
		}
	}

	// Fetch a single blog by ID
	async getBlogById(blogId) {
		try {
			const res = await this.api.get(`/b/${blogId}`);
			return res.data;
		} catch (error) {
			throw error.response?.data || error.message;
		}
	}

	// Create a new blog
	async createBlog({ title, content }) {
		try {
			const res = await this.api.post("/", { title, content });
			return res.data;
		} catch (error) {
			throw error.response?.data || error.message;
		}
	}

	// Update an existing blog
	async updateBlog(blogId, { title, content }) {
		try {
			const res = await this.api.put(`/b/${blogId}`, { title, content });
			return res.data;
		} catch (error) {
			throw error.response?.data || error.message;
		}
	}

	// Delete a blog by ID
	async deleteBlog(blogId) {
		try {
			const res = await this.api.delete(`/b/${blogId}`);
			return res.data;
		} catch (error) {
			throw error.response?.data || error.message;
		}
	}

	// Like a blog by ID
	async likeBlog(blogId) {
		try {
			const res = await this.api.post(`/like`, {blog_id : blogId});
			return res.data;
		} catch (error) {
			throw error.response?.data || error.message;
		}
	}
}


// Create an instance of BlogService
const blogService = new BlogService();

export default blogService;
