import styles from '../styles/login.module.css';
import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useAuth } from '../hooks';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    if (!email || !password) {
      setLoggingIn(false);
      return toast.error('email/password missing', {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 500,
      });

      // setLoggingIn(false);
    }
    const response = await auth.login(email, password);

    if (response.success) {
      console.log('inside response success', response);

      toast.success('login successful', {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 500,
      });
    } else {
      console.log(response);
      toast.error(response.message, {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 5000,
      });
    }
    setLoggingIn(false);
  };

  if (auth.user) {
    return <Navigate to="/" replace />;
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
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
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in....' : 'Log In'}
        </button>
        <Toaster />
      </div>
    </form>
  );
};
export default Login;
