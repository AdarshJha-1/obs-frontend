import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [dashboardList, setDashboardList] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const isAdmin = userData?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const axiosWithCookies = axios.create({
    baseURL: (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080') + '/api',
    withCredentials: true,
  });

  const fetchDashboard = async () => {
    const res = await axiosWithCookies.get('/admin/dashboard');
    setDashboardList(res.data.data.dashboard);
  };

  const fetchUsers = async () => {
    const res = await axiosWithCookies.get('/admin/users');
    setUsers(res.data.data.users);
  };

  const fetchBlogs = async () => {
    const res = await axiosWithCookies.get('/admin/blogs');
    setBlogs(res.data.data.blogs);
  };

  const fetchComments = async () => {
    const res = await axiosWithCookies.get('/admin/comments');
    setComments(res.data.data.comments);
  };

  const deleteUser = async (id) => {
    await axiosWithCookies.delete(`/admin/user/${id}`);
    fetchUsers();
  };

  const deleteBlog = async (id) => {
    await axiosWithCookies.delete(`/admin/blog/${id}`);
    fetchBlogs();
  };

  const deleteComment = async (id) => {
    await axiosWithCookies.delete(`/admin/comment/${id}`);
    fetchComments();
  };

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchBlogs();
    fetchComments();
  }, []);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800">Admin Dashboard</h1>

      {/* Dashboard Summary */}
      {dashboardList && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-2xl text-blue-600 font-bold">{dashboardList.total_users}</p>
          </div>
          <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Blogs</h3>
            <p className="text-2xl text-green-600 font-bold">{dashboardList.total_blogs}</p>
          </div>
          <div className="bg-white border-l-4 border-yellow-500 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Comments</h3>
            <p className="text-2xl text-yellow-600 font-bold">{dashboardList.total_comments}</p>
          </div>
        </section>
      )}

      {/* Users */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Users</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div key={user.ID} className="p-4 border-l-4 border-blue-400 bg-white rounded-lg shadow flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={user.pfp} alt="pfp" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold">{user.username}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                </div>
              </div>
              <Button onClick={() => deleteUser(user.ID)} className="text-red-500">Delete</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs */}
      <section>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Blogs</h2>
        <div className="space-y-2">
          {blogs.map((blog) => (
            <div key={blog.id} className="p-4 border-l-4 border-green-400 bg-white rounded-lg shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{blog.title}</div>
                <div className="text-sm text-gray-600">By: {blog.author}</div>
              </div>
              <Button onClick={() => deleteBlog(blog.id)} className="text-red-500">Delete</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Comments */}
      <section>
        <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Comments</h2>
        <div className="space-y-2">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border-l-4 border-yellow-400 bg-white rounded-lg shadow flex justify-between items-center">
              <div>
                <div className="font-medium">{comment.content}</div>
                <div className="text-sm text-gray-600">By: {comment.author}</div>
              </div>
              <Button onClick={() => deleteComment(comment.id)} className="text-red-500">Delete</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
