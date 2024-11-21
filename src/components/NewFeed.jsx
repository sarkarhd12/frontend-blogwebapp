

// import React, { useEffect, useState } from 'react';
// import { loadAllPost } from '../services/post-service'; // Assuming this is the function to fetch posts
// import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
// import Post from './Post';
// import { toast } from 'react-toastify';

// const NewFeed = () => {
//   const [postContent, setPostContent] = useState({
//     content: [],
//     totalPages:'',
//     totalElements:'',
//     pageSize:'',
//     lastPage:false
//   });

//   useEffect(() => {
//     loadAllPost(0,5)
//       .then((data) => {
//         console.log(data);
//         setPostContent(data); // Assuming 'data' contains { content: [...] }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const changePage=(pageNumber=0,pageSize=5)=>{
//     loadAllPost(pageNumber,pageSize).then((data)=>{
//         setPostContent(data)
//     }).catch(error=>toast.error("error in loading post"))
//   }

//   return (
//     <div className="container-fluid">
//       <Row>
//         <Col md={{ size: 10, offset: 1 }}>
//           <h1>Blog Count {postContent?.content.length}</h1> {/* Displaying the count of posts */}

//           {/* Mapping through the content array and rendering Post components */}
//           {postContent.content.map((post) => {
//             return (
//               <Post post={post} key={post.postId} /> // Returning the Post component
//             );
//           })}

//           <Container classNamemt-3>
             
//           <Pagination>
//             <PaginationItem disabled={postContent.pageNumber=0}>
//                 <PaginationLink previous />
//             </PaginationItem>

//         {
//             [...Array(postContent.totalPages)].map((item,index)=>{
//                 <PaginationItem onClick={()=>changePage(index)} active={index==postContent.pageNumber} key={index}>
//                     <PaginationLink>
//                         {index+1}
//                     </PaginationLink>
//                 </PaginationItem>
//             })
//         }    
        
//             <PaginationItem disabled={postContent.lastPage}>
//                 <PaginationLink next />
//             </PaginationItem>
//           </Pagination>

//           </Container>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default NewFeed;


import React, { useEffect, useState } from 'react';
import { loadAllPost } from '../services/post-service'; // Assuming this is the function to fetch posts
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import Post from './Post';
import { toast } from 'react-toastify';

const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    lastPage: false,
    pageNumber: 0
  });

  useEffect(() => {
    loadAllPost(0, 5)
      .then((data) => {
        console.log(data);
        setPostContent(data); // Assuming 'data' contains { content: [...] }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    loadAllPost(pageNumber, pageSize)
      .then((data) => {
        setPostContent(data);
      })
      .catch((error) => {
        toast.error("Error in loading posts");
      });
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h1>Blog Count {postContent?.content.length}</h1> {/* Displaying the count of posts */}

          {/* Mapping through the content array and rendering Post components */}
          {postContent.content.map((post) => {
            return (
              <Post post={post} key={post.postId} /> // Returning the Post component
            );
          })}

          <Container className="mt-3">
            {/* Pagination Component */}
            <Pagination>
              <PaginationItem disabled={postContent.pageNumber === 0}>
                <PaginationLink previous onClick={() => changePage(postContent.pageNumber - 1)} />
              </PaginationItem>

              {/* Render the pagination items dynamically */}
              {[...Array(postContent.totalPages)].map((_, index) => {
                return (
                  <PaginationItem
                    onClick={() => changePage(index)}
                    active={index === postContent.pageNumber}
                    key={index}
                  >
                    <PaginationLink>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem disabled={postContent.pageNumber === postContent.totalPages - 1}>
                <PaginationLink next onClick={() => changePage(postContent.pageNumber + 1)} />
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default NewFeed;

