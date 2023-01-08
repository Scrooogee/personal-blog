import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios';

export const AddPost = () => {

  const navigate = useNavigate();
  const isAuth = useSelector((state) => Boolean(state.AuthReducer.data))
 
  const [isLoading, setLoading] = React.useState(false);

  const {id} = useParams()

  const isEdit = Boolean(id)

  const [text, setText] = React.useState('');
  const [title, setTitel]= React.useState('');
  const [tags, setTags]= React.useState('');

  const [image, setImage] = React.useState('')


  const inputFileRef = React.useRef(null);

  React.useEffect(() => {
    (async() => {

      try {
        if (id) {
          const {data} = await axios.get(`/posts/${id}`);

          setText(data.text);
          setTitel(data.title);
          setTags(data.tags.join(', '));
          setImage(data.image);

          console.log(data.tags.join(', '))
        }
        
      } catch (error) {
        console.log(error)
        alert('Could not find the poxt!')
      }

    })()
  }, [id])

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];

      formData.append('image', file)

      const {data} = await axios.post('/upload', formData)
      setImage(data)

    } catch (error) {
      console.log(error)
    }
  };

  const onClickRemoveImage = () => {
    setImage('')
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const onSubmit = async () => {
    try {
      // setLoading(true)

      const fields = {
        title,
        image,
        tags,
        text
      }

      const {data} = isEdit ? 
        await axios.patch(`/posts/${id}`, fields) :
        await axios.post('/posts', fields);
      
      const _id = isEdit? id: data._id
      navigate(`/posts/${_id}`)


    } catch (error) {
      console.warn(error)
      alert('Something wrong! Try again...')
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(!isAuth) {
    return <Navigate to='/'/>
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button className={styles.button} onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Add image
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {image && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Delete image
          </Button>
          <img className={styles.image} src={`http://localhost:4000/${image}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        value={title}
        onChange={(e) => setTitel(e.target.value)}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Titel"
        fullWidth
      />
      <TextField 
      value={tags}
      onChange={(e) => setTags(e.target.value)}
      classes={{ root: styles.tags }} 
      variant="standard" 
      placeholder="Tags" 
      fullWidth 
      />
      <SimpleMDE 
      className={styles.editor} 
      value={text} 
      onChange={onChange} 
      options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEdit ? 'Edit' : 'Add post'}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
