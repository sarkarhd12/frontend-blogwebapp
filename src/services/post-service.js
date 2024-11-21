import { privateAxios } from "./helper"
import { myAxios } from "./helper";

// export const doCreatePost=(postData)=>{
//    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData)
//    .then((response)=>response.data)
// }

export const doCreatePost = (postData) => {
    // Use the privateAxios instance to make the POST request
    return privateAxios
      .post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error creating post:', error);
        throw error;
      });
  };

  export const loadAllPost=(pageNumber,pageSize)=>{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addDate`).then(response=>response.data)
  }


  export const loadPost=(postId)=>{
    return myAxios.get(`/posts/${postId}`).then((response)=>response.data)
  }

  export const uploadPostImage=(image,postId)=>{
    let formData = new FormData();
   formData.append("image",image);

   return privateAxios.post(`post/image/upload/${postId}`,formData).then((response)=>response.data)
  }

  export const getPostByCategory=(categoryId)=>{
        return privateAxios.get(`/category/${categoryId}/posts`)
        .then(res=>res.data)
  }

  export const loadPostUserWise=(userId)=>{
    return privateAxios.get(`/user/${userId}/posts`).then(response=>response.data)
  }

  export const deletePostById=(postId)=>{
    return privateAxios.delete(`/posts/${postId}`).then(response=>response.data)
  }

  export function updatePost(post,postId){
    return privateAxios.put(`/posts/${postId}`,post).then(response=>response.data)
  }