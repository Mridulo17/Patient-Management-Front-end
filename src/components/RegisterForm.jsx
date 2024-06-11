import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, getCsrfCookie } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {

      await register({ name, email, password });
      navigate('/');
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input 
            type="text" 
            className="form-control"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            className="form-control"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input 
            type="password" 
            className="form-control"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <div className="mt-3">
          <Link to="/">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
