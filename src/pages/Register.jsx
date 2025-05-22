import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { register } from '../api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, gender, password });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };


  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={handleRegister} className="box">
                <h1 className="title is-4 has-text-centered mb-4">Register</h1>
                {msg && (
                  <div className="notification is-danger is-light">
                    {msg}
                  </div>
                )}
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Gender</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">Pilih Gender</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>

                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field mt-5">
                  <button type="submit" className="button is-primary is-fullwidth">Register</button>
                </div>
                <div className="has-text-centered mt-4">
                  <p>Sudah punya akun? <span className="has-text-link is-clickable" onClick={() => navigate('/')}>Login</span></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register;
