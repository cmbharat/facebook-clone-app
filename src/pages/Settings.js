import React, { useState } from 'react';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks/index';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingForm(true);
    let error = false;
    if (!name || !password || !confirmPassword) {
      error = true;
      toast.error('Name or Password is missing', {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 100,
      });
    }
    if (password !== confirmPassword) {
      toast.error('password not matching', {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 100,
      });
      error = true;
    }
    if (error) {
      return setSavingForm(false);
    }
    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    console.log('settings response ', response);
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();

      navigate('/');
      toast.success('login successful', {
        position: 'top-left',
        icon: '😀',
        style: {
          borderRadius: 50,
        },
        duration: 5000,
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

    setSavingForm(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png" />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Profile...' : 'Save Profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => {
                setEditMode(false);
              }}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
