import React, { useState, useEffect } from 'react';
import { FaBook } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';
import 'bulma/css/bulma.min.css';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const decoded = jwtDecode(accessToken);
          setUsername(decoded.name || 'User');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('accessToken');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('accessToken');
      navigate('/');
    }
  };

  return (
    <nav className="navbar is-primary">
      <div className="navbar-brand">
        <a className="navbar-item" href="/list">
          <FaBook size={20} style={{ marginRight: '5px' }} />
          <span className="has-text-weight-bold">Catatan</span>
        </a>
      </div>

      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <div className="navbar-item">
            <p className="has-text-white">Selamat datang kembali, <strong>{username}</strong></p>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-primary" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;