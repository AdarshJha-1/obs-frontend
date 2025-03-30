import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';
import blogService from '../blog/blog';

function EditPost() {
	const [blog, setBlog] = useState(null)
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
    if (id) {
      blogService.getBlogById(id).then((response) => {
        if (response?.data?.blog) {
          setBlog(response.data.blog);
        } else {
          navigate("/");
        }
      }).catch((error) => {
        console.error("Error fetching blog:", error);
        navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);


	return blog ? (
		<div className='py-8'>
			<Container>
				<PostForm blog={blog} />
			</Container>
		</div>
	) : null
}

export default EditPost
