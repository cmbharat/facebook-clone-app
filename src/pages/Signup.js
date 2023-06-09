import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    let error = false;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('email/password missing', {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 5000,
      });
      error = true;
    }
    if (password !== confirmPassword) {
      toast.error('password not matching', {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 5000,
      });
      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      navigate('/login');

      setSigningUp(false);

      toast.success('signup successful', {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 5000,
      });
    } else {
      toast.error(response.message, {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 5000,
      });
    }

    setSigningUp(false);
  };

  if (auth.user) {
    return <Navigate to="/" replace />;
  }
  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}>Sign Up</span>
      <div className={styles.field}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="consfirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'signing up....' : 'Sign Up'}
        </button>
        <Toaster />
      </div>
    </form>
  );
};
export default Signup;
