import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/inputs/Input';
import { Link, useNavigate} from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!usernameOrEmail.trim()) {
      setError('Username or Email is required');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setError(null);

    // Login API Call
    try {
      const response = await axiosInstance.post('/auth/login', {
        usernameOrEmail,
        password
      });

      const { accessToken, userResponseDTO } = response.data;

      if (accessToken) {
        localStorage.setItem('token', accessToken);
      } else {
        console.warn('No token received from backend');
      }

      if (userResponseDTO) {
        updateUser(userResponseDTO);
      } else {
        updateUser(null);
      }

      navigate('/dashboard');
    } catch (err) {
      localStorage.removeItem('token');
      updateUser(null);

      if (err.response && err.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else if (err.response?.status === 400) {
        setError('Bad request. Please check your input.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input 
            value={usernameOrEmail}
            onChange={({ target }) => setUsernameOrEmail(target.value)}
            label='Email Address or Username'
            placeholder='Username or email@example.com'
            type='text'
            required
          />
          <Input 
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder='Min 8 characters'
            type='password'
            required
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link className='font-medium text-primary underline' to='/signup'>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
