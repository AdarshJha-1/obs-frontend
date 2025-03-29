import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import blogService from "../../blog/blog"; // Use your Go backend service
import { useNavigate } from "react-router-dom";

export default function blogForm({ blog }) {
    const { register, handleSubmit, control, getValues } = useForm({
        defaultValues: {
            title: blog?.title || "",
            content: blog?.content || "",
        },
    });

    const navigate = useNavigate();

    const submit = async (data) => {
        try {
            const blogData = {
                title: data.title,
                content: data.content, // Store content as Markdown
            };

            if (blog) {
                // Update existing blog
                await blogService.updateBlog(blog.id, blogData);
            } else {
                // Create new blog
                await blogService.createBlog(blogData);
            }

            navigate("/"); // Redirect to home or posts list
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-col items-center justify-center gap-10">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                {/* Markdown Editor */}
                <RTE 
                    label="Content :" 
                    name="content" 
                    control={control} 
                    defaultValue={getValues("content")} 
                    markdown={true} // Ensures markdown support
                />
            </div>
            <div className="w-1/3 px-2">
                <Button type="submit" bgColor={blog ? "bg-green-500" : undefined} className="w-full">
                    {blog ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
