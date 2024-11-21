// import React, { useEffect, useRef, useState } from 'react';
// import Base from './Base';
// import { useParams } from 'react-router-dom';
// import { loadPost, updatePost } from '../services/post-service';
// import { toast } from 'react-toastify';
// import { loadAllCategories } from '../services/category-service';
// import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
// import JoditEditor from 'jodit-react';

// const UpdateBlog = () => {
//   const editor = useRef(null);
//   const [categories, setCategories] = useState([]);
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     // Fetch categories and post data when the component mounts
//     loadAllCategories()
//       .then((data) => {
//         setCategories(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     loadPost(postId)
//       .then((data) => {
//         setPost({
//           ...data,
//           categoryId: data.category.categoryId, // Assuming post has a category object
//         });
//       })
//       .catch((error) => {
//         toast.error('Error in loading post');
//         console.log(error);
//       });
//   }, [postId]);

//   const handleChange = (event, fieldName) => {
//     setPost({
//       ...post,
//       [fieldName]: event.target.value,
//     });
//   };

//   const handleImageChange = (event) => {
//     // Implement your image upload logic here
//     console.log(event.target.files[0]);
//   };

//   const updatePostById = (event) => {
//     event.preventDefault();
//     updatePost({ ...post, category: { categoryId: post.categoryId } }, post.postId)
//       .then(() => {
//         toast.success('Post updated successfully');
//       })
//       .catch((error) => {
//         toast.error('Try later for update');
//         console.log(error);
//       });
//   };

//   const updateHtml = () => {
//     if (!post) return <div>Loading...</div>; // Ensure that post is loaded before rendering the form

//     return (
//       <div className="wrapper">
//         <Card>
//           <CardBody>
//             <h3>Update Post</h3>
//             <Form onSubmit={updatePostById}>
//               {/* Title Field */}
//               <div className="my-3">
//                 <Label for="title">Post Title</Label>
//                 <Input
//                   type="text"
//                   name="title"
//                   id="title"
//                   placeholder="Enter title"
//                   className="rounded-0"
//                   value={post.title}
//                   onChange={(event) => handleChange(event, 'title')}
//                 />
//               </div>

//               {/* Content Field */}
//               <div className="my-3">
//                 <Label for="content">Post Content</Label>
//                 <JoditEditor
//                   ref={editor}
//                   value={post.content}
//                   onChange={(newContent) => setPost({ ...post, content: newContent })}
//                 />
//               </div>

//               {/* Image Field */}
//               <div className="mt-3">
//                 <Label for="image">Select Image</Label>
//                 <Input type="file" id="image" onChange={handleImageChange} />
//               </div>

//               {/* Category Field */}
//               <div className="my-3">
//                 <Label for="category">Post Category</Label>
//                 <Input
//                   type="select"
//                   name="categoryId"
//                   id="category"
//                   placeholder="Select category"
//                   className="rounded-0"
//                   value={post.categoryId}
//                   onChange={(event) => handleChange(event, 'categoryId')}
//                 >
//                   <option disabled value="">
//                     Select Category
//                   </option>
//                   {categories.length > 0 ? (
//                     categories.map((category) => (
//                       <option key={category.categoryId} value={category.categoryId}>
//                         {category.categoryTitle}
//                       </option>
//                     ))
//                   ) : (
//                     <option>Loading categories...</option>
//                   )}
//                 </Input>
//               </div>

//               {/* Form Actions */}
//               <Container className="text-center">
//                 <Button type="submit" color="primary">
//                   Update Post
//                 </Button>
//                 <Button type="button" color="danger" onClick={''}>
//                   Reset Content
//                 </Button>
//               </Container>
//             </Form>
//           </CardBody>
//         </Card>
//       </div>
//     );
//   };

//   return (
//     <Base>
//       <Container>
//         {updateHtml()}
//       </Container>
//     </Base>
//   );
// };

// export default UpdateBlog;


import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadPost, updatePost } from '../services/post-service'; // assuming these exist
import { toast } from 'react-toastify';
import { Button, Form, Input, Label, Container, Card, CardBody } from 'reactstrap';
import JoditEditor from 'jodit-react';
import { loadAllCategories } from '../services/category-service';

const UpdateBlog = () => {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    title: '',
    content: '', // Raw HTML content will be stored here
    categoryId: '',
  });

  const { postId } = useParams();
  const navigate = useNavigate();

  // Load categories and post data for update
  useEffect(() => {
    loadAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));

    // Fetch the post data for updating
    if (postId) {
      loadPost(postId)
        .then((data) => {
          // Ensure the post content is available in the editor (with raw HTML)
          setPost({
            title: data.title,
            content: data.content, // HTML content
            categoryId: data.category.categoryId,
          });
        })
        .catch((error) => {
          toast.error('Error loading post.');
          console.log(error);
        });
    }
  }, [postId]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };

  const handleContentChange = (newContent) => {
    setPost({
      ...post,
      content: newContent, // Update the content with the new editor content
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update post with the new content and category
    updatePost({ ...post, category: { categoryId: post.categoryId } }, postId)
      .then(() => {
        toast.success('Post updated successfully');
        navigate('/user/dashboard'); // Redirect to dashboard after success
      })
      .catch((error) => {
        toast.error('Error while updating post');
        console.log(error);
      });
  };

  return (
    <Container>
      <Card>
        <CardBody>
          <h3>Update Post</h3>
          <Form onSubmit={handleSubmit}>
            {/* Title Field */}
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Enter post title"
                className="rounded-0"
                value={post.title}
                onChange={(event) => handleChange(event, 'title')}
              />
            </div>

            {/* Content Field */}
            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                ref={editor}
                value={post.content} // Pass raw HTML content from the post state
                onChange={handleContentChange} // Update the state when content changes
              />
            </div>

            {/* Category Field */}
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                name="categoryId"
                id="category"
                value={post.categoryId}
                onChange={(event) => handleChange(event, 'categoryId')}
              >
                <option disabled value="">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            {/* Form Actions */}
            <Container className="text-center">
              <Button type="submit" color="primary">
                Update Post
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default UpdateBlog;
