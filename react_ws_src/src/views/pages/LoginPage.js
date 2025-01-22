import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom'; 
import { useAppContext } from '../../context/app.context';

const LoginPage = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(false);
  const { dispatch } = useAppContext();

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (username.trim() && password.trim()) {
      if (storedUsers[username] && storedUsers[username].password === password) {
        dispatch({
          type: 'LOGIN',
          payload: { username },
        });
        app.settings.curr_user = { name: username };
        history.push('/ttt');
      } else {
        alert('Invalid username or password');
      }
    } else {
      alert('Please enter both username and password.');
    }
  }, [username, password, dispatch, history]);

  const handleCreateNewUser = useCallback((e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (username.trim() && password.trim()) {
      if (storedUsers[username]) {
        alert('Username already exists');
      } else {
        storedUsers[username] = {
          password,
          userPlayer: {},
        };
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert('User created successfully!');
        setNewUser(false);
        handleLogin(e);
      }
    } else {
      alert('Please enter both username and password.');
    }
  }, [username, password]);

  const handleGuestLogin = useCallback(() => {
    dispatch({
      type: 'LOGIN',
      payload: { username: 'Guest' },
    });
    app.settings.curr_user = { name: 'Guest' };
    history.push('/ttt');
  }, [dispatch, history]);

  return (
    <div id="LoginPage">
      <h1>{newUser ? 'Create New User' : 'Login'}</h1>

      <form onSubmit={newUser ? handleCreateNewUser : handleLogin}>
        <div className="input_holder left">
          <label>Username</label>
          <input
            type="text"
            className="input name"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div className="input_holder left">
          <label>Password</label>
          <input
            type="password"
            className="input name"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {newUser ? (
          <div>
            <button type="submit" className="button">
              <span>CREATE USER <span className="fa fa-caret-right"></span></span>
            </button>
            <button
              type="button"
              onClick={() => setNewUser(false)}
              className="button guest"
            >
              <span>Login</span>
            </button>
          </div>
        ) : (
          <div>
            <button type="submit" className="button">
              <span>LOGIN <span className="fa fa-caret-right"></span></span>
            </button>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="button guest"
            >
              <span>LOGIN AS GUEST</span>
            </button>

            <button
              type="button"
              onClick={() => setNewUser(true)}
              className="button guest"
            >
              <span>Create a New Account</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default withRouter(LoginPage);
