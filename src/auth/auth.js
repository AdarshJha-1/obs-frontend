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

	async createAccount({ email, password, username }) {
		try {
			const res = await this.api.post("/register", { email, password, username });
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
}

const authService = new AuthService();

export default authService;
