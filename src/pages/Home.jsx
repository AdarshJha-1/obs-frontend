import React, { useEffect, useState } from "react";
import blogService from "../blog/blog"; // Import BlogService
import { Container } from "../components";
import BlogCard from "../components/BlogCard";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await blogService.getAllBlogs();
                if (response.success) {
                    setPosts(response.data.blogs); // Ensure the correct response structure
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <h1 className="text-2xl font-semibold text-gray-700">Loading posts...</h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <h1 className="text-xl font-semibold text-gray-600">
                        No posts available. Login to create or view posts.
                    </h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-col gap-6">
                    {posts.map((post) => (
                        <BlogCard key={post.id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
