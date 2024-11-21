// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // For making HTTP requests
// import { Navigate, useNavigate } from 'react-router-dom'; // Updated import for v6
// import Base from '../components/Base';

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [searchKeywords, setSearchKeywords] = useState('');
//   const navigate = useNavigate(); // useNavigate instead of useHistory

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get('http://localhost:8080/api/posts', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setPosts(response.data.posts); // Assuming response has posts field
//       } catch (error) {
//         setErrorMessage('Failed to fetch posts. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await axios.get(`http://localhost:8080/api/posts/search/${searchKeywords}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPosts(response.data); // Assuming response is an array of posts
//     } catch (error) {
//       setErrorMessage('Failed to search posts. Please try again later.');
//     }
//   };

//   if (loading) {
//     return <div>Loading posts...</div>;
//   }

//   if (!localStorage.getItem('authToken')) {
//     return <Navigate to="/login" />; // Redirect if no authToken exists
//   }

//   return (
//     <Base>
//       <div className="container">
//         <h2>All Posts</h2>
        
//         {/* Search Form */}
//         <form onSubmit={handleSearch} className="mb-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search posts by title"
//             value={searchKeywords}
//             onChange={(e) => setSearchKeywords(e.target.value)}
//           />
//           <button type="submit" className="btn btn-primary mt-2">Search</button>
//         </form>

//         {/* Error Handling */}
//         {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

//         {/* Posts List */}
//         <div className="post-list">
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div key={post.id} className="post-item">
//                 <h3>{post.title}</h3>
//                 <p>{post.content}</p>
//                 <button onClick={() => navigate(`/posts/${post.id}`)} className="btn btn-info">View Details</button>
//               </div>
//             ))
//           ) : (
//             <div>No posts available</div> // Message when no posts are found
//           )}
//         </div>
//       </div>
//     </Base>
//   );
// };

// export default Home;

import React, { useEffect } from 'react'
import Base from '../components/Base'
import NewFeed from '../components/NewFeed';
import { Col, Container, Row } from 'reactstrap';
import CategorySideMenu from '../components/CategorySideMenu';

export const Home = () => {
  
  return (
   <Base>
   <Container mt-3>
    <Row>
        <Col md={3}>
        <CategorySideMenu />
        </Col>
        <Col md={2}>
        <NewFeed /></Col>
    </Row>
       </Container>
   </Base>
  )
}
export default Home;

