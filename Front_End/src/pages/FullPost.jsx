import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import reactMarkdown from "react-markdown";

export const FullPost = () => {
  const [post, setPost] = React.useState()
  const [loading, setLoading] = React.useState(true)

  const { id } = useParams()

  React.useEffect(() => {
    try {
      (async() => {
        const {data} = await axios.get(`/posts/${id}`)
        setPost(data)
        setLoading(false)
      })()
    } catch (error) {
      console.log(error)
    }
    
  }, [id])

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
        commentsCount={3}
        tags={post.tags}
        isFullPost
      >
       <reactMarkdown children={post.text}/>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
