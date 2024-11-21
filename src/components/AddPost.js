


// import React, { useEffect, useState, useRef } from 'react';
// import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
// import { loadAllCategories } from '../services/category-service';
// import JoditEditor from "jodit-react";
// import { doCreatePost, uploadPostImage } from '../services/post-service';
// import { getCurrentUSerDetails } from '../auth';
// import { toast } from 'react-toastify';
// import Base from './Base';

// const AddPost = () => {
//   const editor = useRef(null);
//   const [categories, setCategories] = useState([]);
//   const [user, setUser] = useState(undefined); // To store user info
//   const [post, setPost] = useState({
//     title: '',
//     content: '',
//     categoryId: ''
//   });
//   const [image, setImage] = useState(null); // Store selected image

//   useEffect(() => {
//     // Fetch user details and categories when the component mounts
//     setUser(getCurrentUSerDetails());
//     loadAllCategories()
//       .then((data) => {
//         console.log(data); // Log the fetched categories
//         setCategories(data); // Set the categories in state
//       })
//       .catch((error) => {
//         console.log(error); // Log any errors
//       });
//   }, []);

//   // Handle form input changes
//   const fieldChange = (event) => {
//     setPost({ ...post, [event.target.name]: event.target.value });
//   };

//   // Handle content changes from JoditEditor
//   const contentFieldChanged = (data) => {
//     setPost({ ...post, content: data });
//   };

//   // Handle image file change
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   // Handle form submission
//   const createPost = (event) => {
//     event.preventDefault();

//     if (!post.title.trim()) {
//       alert("Title is required");
//       return;
//     }
//     if (!post.content.trim()) {
//       alert("Content is required");
//       return;
//     }
//     if (!post.categoryId) {
//       alert("Category is required");
//       return;
//     }

//     if (!user) {
//       alert("You must be logged in to create a post");
//       return;
//     }

//     // Add user ID to the post object
//     post.userId = user.id;

//     // Submit the post
//     doCreatePost(post)
//       .then((data) => {
//         if (image) {
//           // If there is an image, upload it
//           uploadPostImage(image, data.postId)
//             .then(() => {
//               toast.success("Image uploaded successfully");
//             })
//             .catch((error) => {
//               toast.error("Error uploading image");
//             });
//         }
//         toast.success("Post created successfully!");
        
//         setPost({
//           title: '',
//           content: '',
//           categoryId: ''
//         });
//         setImage(null); // Reset image after submission
//         console.log(data); // Log the created post
//       })
//       .catch((error) => {
//         console.log(error); // Log any errors during post creation
//       });
//   };

//   // Reset the form fields
//   const resetForm = () => {
//     setPost({
//       title: '',
//       content: '',
//       categoryId: ''
//     });
//     setImage(null); // Reset image as well
//   };

//   return (
//     <Base>
//     <div className="wrapper">
//       <Card>
//         <CardBody>
//           <h3>What is going on in your mind?</h3>
//           <Form onSubmit={createPost}>
//             {/* Title Field */}
//             <div className="my-3">
//               <Label for="title">Post title</Label>
//               <Input
//                 type="text"
//                 name="title"
//                 id="title"
//                 placeholder="Enter here"
//                 className="rounded-0"
//                 value={post.title}
//                 onChange={fieldChange}
//               />
//             </div>

//             {/* Content Field */}
//             <div className="my-3">
//               <Label for="content">Post content</Label>
//               <JoditEditor
//                 ref={editor}
//                 value={post.content}
//                 onChange={contentFieldChanged}
//               />
//             </div>

//             {/* Image Field */}
//             <div className="mt-3">
//               <Label for="image">Select image</Label>
//               <Input type="file" id="image" onChange={handleFileChange} />
//             </div>

//             {/* Category Field */}
//             <div className="my-3">
//               <Label for="category">Post category</Label>
//               <Input
//                 type="select"
//                 name="categoryId"
//                 id="category"
//                 placeholder="Select category"
//                 className="rounded-0"
//                 value={post.categoryId}
//                 onChange={fieldChange}
//               >
//                 <option disabled value="">
//                   Select Category
//                 </option>
//                 {categories.length > 0 ? (
//                   categories.map((category) => (
//                     <option key={category.categoryId} value={category.categoryId}>
//                       {category.categoryTitle}
//                     </option>
//                   ))
//                 ) : (
//                   <option>Loading categories...</option>
//                 )}
//               </Input>
//             </div>

//             {/* Form Actions */}
//             <Container className="text-center">
//               <Button type="submit" color="primary">
//                 Create Post
//               </Button>
//               <Button type="button" color="danger" onClick={resetForm}>
//                 Reset Content
//               </Button>
//             </Container>
//           </Form>
//         </CardBody>
//       </Card>
//     </div>
//     </Base>
//   );
// };

// export default AddPost;

import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import { loadAllCategories } from '../services/category-service';
import JoditEditor from "jodit-react";
import { doCreatePost, uploadPostImage } from '../services/post-service';
import { getCurrentUSerDetails } from '../auth';
import { toast } from 'react-toastify';
import Base from './Base';

const AddPost = () => {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined); // To store user info
  const [post, setPost] = useState({
    title: '',
    content: '',  // HTML content will be stored here
    categoryId: ''
  });
  const [image, setImage] = useState(null); // Store selected image

  useEffect(() => {
    // Fetch user details and categories when the component mounts
    setUser(getCurrentUSerDetails());
    loadAllCategories()
      .then((data) => {
        console.log(data); // Log the fetched categories
        setCategories(data); // Set the categories in state
      })
      .catch((error) => {
        console.log(error); // Log any errors
      });
  }, []);

  // Handle form input changes
  const fieldChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  // Handle content changes from JoditEditor
  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data }); // The raw HTML content from JoditEditor
  };

  // Handle image file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const createPost = (event) => {
    event.preventDefault();

    if (!post.title.trim()) {
      alert("Title is required");
      return;
    }
    if (!post.content.trim()) {
      alert("Content is required");
      return;
    }
    if (!post.categoryId) {
      alert("Category is required");
      return;
    }

    if (!user) {
      alert("You must be logged in to create a post");
      return;
    }

    // Add user ID to the post object
    post.userId = user.id;

    // Submit the post
    doCreatePost(post)
      .then((data) => {
        if (image) {
          // If there is an image, upload it
          uploadPostImage(image, data.postId)
            .then(() => {
              toast.success("Image uploaded successfully");
            })
            .catch((error) => {
              toast.error("Error uploading image");
            });
        }
        toast.success("Post created successfully!");
        
        setPost({
          title: '',
          content: '',
          categoryId: ''
        });
        setImage(null); // Reset image after submission
        console.log(data); // Log the created post
      })
      .catch((error) => {
        console.log(error); // Log any errors during post creation
      });
  };

  // Reset the form fields
  const resetForm = () => {
    setPost({
      title: '',
      content: '',
      categoryId: ''
    });
    setImage(null); // Reset image as well
  };

  return (
    <Base>
    <div className="wrapper">
      <Card>
        <CardBody>
          <h3>What is going on in your mind?</h3>
          <Form onSubmit={createPost}>
            {/* Title Field */}
            <div className="my-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                value={post.title}
                onChange={fieldChange}
              />
            </div>

            {/* Content Field */}
            <div className="my-3">
              <Label for="content">Post content</Label>
              <JoditEditor
                ref={editor}
                value={post.content} // Pass raw HTML content from the post state
                onChange={contentFieldChanged} // Update the state when content changes
              />
            </div>

            {/* Image Field */}
            <div className="mt-3">
              <Label for="image">Select image</Label>
              <Input type="file" id="image" onChange={handleFileChange} />
            </div>

            {/* Category Field */}
            <div className="my-3">
              <Label for="category">Post category</Label>
              <Input
                type="select"
                name="categoryId"
                id="category"
                placeholder="Select category"
                className="rounded-0"
                value={post.categoryId}
                onChange={fieldChange}
              >
                <option disabled value="">
                  Select Category
                </option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryTitle}
                    </option>
                  ))
                ) : (
                  <option>Loading categories...</option>
                )}
              </Input>
            </div>

            {/* Form Actions */}
            <Container className="text-center">
              <Button type="submit" color="primary">
                Create Post
              </Button>
              <Button type="button" color="danger" onClick={resetForm}>
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
    </Base>
  );
};

export default AddPost;
