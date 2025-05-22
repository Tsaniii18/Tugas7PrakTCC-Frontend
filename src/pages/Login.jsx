import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = await auth({ email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate("/list");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={handleAuth} className="box">
                <h1 className="title is-4 has-text-centered mb-4">Login</h1>
                {message && (
                  <div className="notification is-danger is-light">
                    {message}
                  </div>
                )}
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="*****"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button type="submit" className="button is-primary is-fullwidth">Login</button>
                </div>
                <div className="has-text-centered mt-4">
                  <p>Belum punya akun? <span className="has-text-link is-clickable" onClick={() => navigate('/register')}>Register</span></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;
