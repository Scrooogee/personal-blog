import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import reactMarkdown from "react-markdown";

export const FullPost = () => {
  const [post, setPost] = React.useState()
  const [loading, setLoading] = React.useState(true)

  const { id } = useParams()

  const [coments, setComents] = React.useState([])
  const thisComents = coments.filter(com => com.post === id)
  const [comment, setComment] = React.useState('')


  React.useEffect(() => {
    try {
      (async() => {
        const post = await axios.get(`/posts/${id}`);
        const coments = await axios.get(`/posts/${id}/coment`);
        
        setPost(post.data)
        setComents(coments.data)

        setLoading(false)
      })()
    } catch (error) {
      console.log(error)
    }
    
  }, [id])

  
  
  const onSubmit = async () => {

    try {

      const fields = {
        text: comment
      }

      await axios.post(`/posts/${id}/coment`, fields)
      const post = await axios.get(`/posts/${id}`);
      const coments = await axios.get(`/posts/${id}/coment`);
      
      setComment('')
      setPost(post.data)
      setComents(coments.data)
      
    } catch (error) {
      console.warn(error)
      alert('Something wrong! Try again...')
    }
      
  };

  if (loading) {
    return <Post isLoading={{loading}}/>
  }

  return (
    <>
      <Post
        id={post._id}
        title={post.title}
        imageUrl={post.image && `http://localhost:4000/${post.image}`}
        user={{
          avatarUrl: post.author.avatar,
          fullName: post.author.fullName,
        }}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={post.coments.length}
        tags={post.tags}
        isFullPost
      >
       <reactMarkdown children={post.text}/>
      </Post>
      <CommentsBlock
      
        thisComents={thisComents}
        isLoading={false}
      >
        <Index 
        onSubmit={onSubmit}
        comment={comment}
        setComment={setComment}
        />
      </CommentsBlock>
    </>
  );
};
