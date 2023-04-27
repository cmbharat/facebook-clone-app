import React, { useEffect, useState } from 'react';
import styles from '../styles/settings.module.css';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { toast, Toaster } from 'react-hot-toast';
import { Loader } from '../components';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);

  // const params = useParams();
  const auth = useAuth();

  const { userId } = useParams();

  // const location = useLocation();
  // console.log('location', location);
  // const user = {};

  // const { user = {} } = location.state;

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        console.log(response);
        setUser(response.data.user);
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

        return <Navigate to="/" replace />;
      }
      setLoading(false);
    };
    getUser();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }
  const isUserFriend = () => {
    const friends = auth.user.friends;
    console.log('friends', friends);
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }

    return false;
  };
  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);
    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      console.log(response, 'friends');
      toast.success('friend removed successfully', {
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
    setRequestInProgress(false);
  };
  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      console.log(response, 'friends');
      toast.success('friend added successfully', {
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
    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png" />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {isUserFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Removing Friend' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding Friend' : 'Add Friend'}
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default UserProfile;
