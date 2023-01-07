import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/slices/auth';

export const Header = () => {
  
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => Boolean(state.AuthReducer.data))

  const onClickLogout = () => {
    if(window.confirm('Log out?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };


  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Personal blog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Add article</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="contained">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
