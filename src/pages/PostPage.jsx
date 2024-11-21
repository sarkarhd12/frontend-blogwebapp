

import React, { useEffect, useState } from 'react';
import Base from '../components/Base';
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap';
import { loadPost } from '../services/post-service';
import { toast } from 'react-toastify';
import { BASE_URL } from '../services/helper';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response?.status === 404) {
          toast.error("Post not found.");
        } else {
          toast.error("Error loading post, please try again later.");
        }
      })
      .finally(() => setLoading(false));
  }, [postId]);

  const printDate = (num) => {
    return new Date(num).toLocaleDateString();
  };

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | My Blog`;
    }
  }, [post]);

  return (
    <Base>
      <Container className="mt-4">
      
        <Row>
          <Col md={{ size: 12 }}>
            {loading ? (
              <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : post ? (
              <Card className="mt-3">
                <CardBody>
                  <CardText>
                    Posted By <b>{post.user.name}</b> on <b>{printDate(post.addDate)}</b>
                  </CardText>
                  <CardText>
                    <h3>{post.title}</h3>
                  </CardText>
                  {post.imageName && (
                    <div className="image-container mt-3">
                     <img
  className="img-fluid"
  style={{ maxWidth: "50%", height: "auto", display: "block", margin: "0 auto" }}
  src={`${BASE_URL}/post/image/${post.imageName}`}
  alt={post.title || "Post Image"}
/>

                    </div>
                  )}
                  <CardText
                    className="mt-4"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              </Card>
            ) : (
              <div className="text-center">
                <h3>Post not found!</h3>
                <Link to="/">Go back to Home</Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
 
