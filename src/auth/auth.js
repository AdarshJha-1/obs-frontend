import axios from "axios";

export class AuthService {
	constructor() {
		this.api = axios.create({
			baseURL: "http://localhost:8080/api",
			headers: {
				"Content-Type": "application/json"
			},
			withCredentials: true
		});
	}

	async createAccount({ email, password, username, image_url }) {
		try {
			const res = await this.api.post("/register", { email, password, username, pfp: image_url });
			if (!res.status.toString().startsWith("2")) {
				throw new Error(res.data);
			}
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			const res = await this.api.post("/login", { identifier: email, password });
			if (!res.status.toString().startsWith("2")) {
				throw new Error(res.data);
			}
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			const res = await this.api.get(`/user/`);
			if (!res.status.toString().startsWith("2")) {
				throw new Error(res.data);
			}
			return res.data;
		} catch (error) {
			console.error("AuthService :: getCurrentUser :: error", error);
			return null;
		}
	}

	async getUserById(id) {
		try {
			const res = await this.api.get(`/user/${id}`);
			if (!res.status.toString().startsWith("2")) {
				throw new Error(res.data);
			}
			return res.data;
		} catch (error) {
			console.error("AuthService :: getCurrentUser :: error", error);
			return null;
		}
	}
	async followUser(userId) {
		try {
			const res = await this.api.post(`/user/follow/${userId}`);
			if (!res.status.toString().startsWith("2")) {
				throw new Error(res.data);
			}
			return res.data;
		} catch (error) {
			console.error("AuthService :: followUser :: error", error);
			throw error;
		}
	}

	async unfollowUser(userId) {
		try {
			const res = await this.api.delete(`/user/unfollow/${userId}`);
			if (!res.status.toString().startsWith("2")) {
				throw new Error(res.data);
			}
			return res.data;
		} catch (error) {
			console.error("AuthService :: unfollowUser :: error", error);
			throw error;
		}
	}
	async logout() {
		try {
			const res = await this.api.post("/user/logout");
			if (!res.status.toString().startsWith("2")) {
				throw new Error(res.data);
			}
			return res.data;
		} catch (error) {
			console.error("AuthService :: logout :: error", error);
			throw error;
		}
	}

	async getAllUsers() {
		try {
			const res = await this.api.get(`/user/all`);
			if (!res.status.toString().startsWith("2")) {
				throw new Error(res.data);
			}
			return res.data;
		} catch (error) {
			console.error("AuthService :: getCurrentUser :: error", error);
			return null;
		}
	}

}

const authService = new AuthService();

export default authService;
