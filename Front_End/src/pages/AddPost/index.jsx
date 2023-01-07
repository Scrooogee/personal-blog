import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios';

export const AddPost = () => {

  const isAuth = useSelector((state) => Boolean(state.AuthReducer.data))
 


  const [value, setValue] = React.useState('');
  const [title, setTitel]= React.useState('')
  const [tags, setTags]= React.useState('')

  const [imageUrl, setImageUrl] = React.useState('')

  console.log(imageUrl)

  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];

      formData.append('image', file)

      const {data} = await axios.post('/upload', formData)
      console.log(data)
      setImageUrl(data)

    } catch (error) {
      console.log(error)
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);



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
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Delete image
          </Button>
          <img className={styles.image} src={`http://localhost:4000/${imageUrl}`} alt="Uploaded" />
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
      alue={tags}
      onChange={(e) => setTags(e.target.value)}
      classes={{ root: styles.tags }} 
      variant="standard" 
      placeholder="Tags" 
      fullWidth 
      />
      <SimpleMDE 
      className={styles.editor} 
      value={value} 
      onChange={onChange} 
      options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Add post
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
