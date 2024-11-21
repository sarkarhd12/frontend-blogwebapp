import React, { useState, useEffect } from 'react';
import Base from '../components/Base';
import { Container } from 'reactstrap';
import AddPost from '../components/AddPost';
import { getCurrentUSerDetails } from '../auth';  // Assuming this function fetches user details
import { loadPostUserWise } from '../services/post-service';
import { toast } from 'react-toastify';
import Post from '../components/Post';

const UserDashBoard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // useEffect with empty dependency array to run only once when the component mounts
  useEffect(() => {
    const userDetails = getCurrentUSerDetails();  // Get user details
    if (userDetails) {
      setUser(userDetails);  // Set user in state
      loadPostUserWise(userDetails.id)  // Load posts based on user ID
        .then(data => {
          setPosts(data);  // Set posts in state
        })
        .catch(error => toast.error('Error loading user posts'));
    }
  }, []);  // Empty dependency array ensures this effect runs only once on mount

  // Render the user dashboard with posts and AddPost component
  return (
    <Base>
      <Container>
        <AddPost />
        <h1>Post Count: {posts.length}</h1>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </Container>
    </Base>
  );
};

export default UserDashBoard;

