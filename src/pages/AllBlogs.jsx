import React, { useState, useEffect } from "react";
import { Container} from "../components";
import blogService from "../blog/blog";
import BlogCard from "../components/BlogCard";
function AllBlogs() {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const res = await blogService.getAllBlogs();
				if (res) {
					setBlogs(res.data.blogs);
				}
			} catch (error) {
				console.error("Error fetching blogs:", error);
			}
		};

		fetchBlogs();
	}, []);

	return (
		<div className="w-full py-8">
			<Container>
				<div className="flex flex-wrap">
					{blogs.map((blog) => (
						<div key={blog.id} className="p-2 w-1/4">
							<BlogCard {...blog} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

export default AllBlogs;
