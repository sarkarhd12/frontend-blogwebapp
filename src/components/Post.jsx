import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUSerDetails, isLoggedIn } from '../auth'

const Post = ({post={title:"hi",content:"no"},deletePost}) => {

    const [user,setUser] = useState(null)
    const [login,setLogin] = useState(null);

    useEffect(()=>{
        setUser(getCurrentUSerDetails())
        setLogin(isLoggedIn())
    })




  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
        <h1>{post.title}</h1>
        <CardText>
            {post.content.substring(0,25)}...
        </CardText>
        <div>
            <Link className='btn btn-secondary' to={"/post/"+post.postId}>Read more</Link>

{
    isLoggedIn ? (user && user.id==post.user.id ?             
        <Button color='danger' className='ms-2' onClick={()=>deletePost(post)} >Delete</Button> : '' ) : ''}
        {isLoggedIn ? (user && user.id==post.user.id ?
        <Button color='warning' tag={Link} to={`/user/update/${post.postId}`} className='ms-2'>Update</Button> : '' ) : ''}

        </div>
        </CardBody>
        </Card>
  )
}

export default Post