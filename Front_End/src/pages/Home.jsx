import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';


import { fetchPosts, fetchTags, fetchPopularPosts } from '../redux/slices/post.js';

export const Home = () => {

  const dispatch = useDispatch();

  const userData = useSelector(state => state.AuthReducer.data)

  const {posts, tags} = useSelector(state => state.PostReducer);
  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  
 

  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())

  }, [])


  return (
    
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab onClick={() => dispatch(fetchPosts())} label="New" aria-selected='false' />
        <Tab onClick={() => {dispatch(fetchPopularPosts())}}  label="Popular" aria-selected='true' />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items.data).map((obj, index) => isPostLoading ? <Post key={index} isLoading={true}/> : (
            <Post
              key={`${obj.title}__${index}`}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.image && `http://localhost:4000/${obj.image}`}
              user={{
                avatarUrl: obj.author.avatar,
                fullName: obj.author.fullName,
              }}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.coments.length}
              tags={obj.tags}
              isEditable={userData?._id === obj.author._id}
              isLoading={false}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items.data} isLoading={isTagsLoading} />
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: '???????? ????????????',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: '?????? ???????????????? ??????????????????????',
              },
              {
                user: {
                  fullName: '???????? ????????????',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
