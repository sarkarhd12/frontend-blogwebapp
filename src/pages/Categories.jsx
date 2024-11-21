// import React, { useEffect, useState } from 'react'
// import Base from '../components/Base'
// import { useParams } from 'react-router-dom'
// import CategorySideMenu from '../components/CategorySideMenu';
// import { Col, Container, Row } from 'reactstrap';
// import NewFeed from '../components/NewFeed';
// import { loadAllCategories } from '../services/category-service';
// import { toast } from 'react-toastify';
// import Post from '../components/Post';

// const Categories = () => {

//    const [posts,setPosts] = useState([])

//     const {categoryId} = useParams();
//     useEffect(()=>{
//       loadAllCategories(categoryId)
//       .then(data=>
//          setPosts([...data])
//       ).catch(error=>{
//         toast.error("error")
//       })
//     },[categoryId])

//   return (
//    <Base>
//        <Container mt-3>
//     <Row>
//         <Col md={3}>
//         <CategorySideMenu />
//         </Col>
//         <Col md={2}>
//         {
//             posts && posts.map((post,index)=>{
//                 return (
//                     <Post key={index} post={post} />
//                 )
//             })
//         }
//        </Col>
//     </Row>
//        </Container>
//    </Base>
//   )
// }

// export default Categories


import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import CategorySideMenu from '../components/CategorySideMenu';
import { Col, Container, Row } from 'reactstrap';
import { getPostByCategory } from '../services/post-service';  // Ensure you have this service
import { toast } from 'react-toastify';
import Post from '../components/Post';

const Categories = () => {

   const [posts, setPosts] = useState([]);
   const { categoryId } = useParams();  // Get category ID from URL

   useEffect(() => {
     if (categoryId) {
       // Fetch posts by categoryId
       getPostByCategory(categoryId)
         .then(data => {
           setPosts(data); // Set the posts from the category
         })
         .catch(error => {
           toast.error("Error loading posts");
         });
     }
   }, [categoryId]);  // Re-fetch posts when categoryId changes

  return (
   <Base>
     <Container className="mt-3">
       <Row>
         <Col md={3}>
           <CategorySideMenu />
         </Col>
         <Col md={9}>  {/* Make sure this is the correct column size */}
           {
             posts && posts.length > 0 ? (
               posts.map((post, index) => (
                 <Post key={index} post={post} />
               ))
             ) : (
               <p>No posts available for this category.</p>
             )
           }
         </Col>
       </Row>
     </Container>
   </Base>
  );
};

export default Categories;
