import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';

const FriendsList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user;
  console.log(friends);
  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>
      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>No Friends Found</div>
      )}
      {friends &&
        friends.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link
              className={styles.friendsItem}
              to={`/user/${friend.to_user._id}`}
            >
              <div className={styles.friendsImg}>
                <img src="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png" />
              </div>
              <div className={styles.friendsName}>{friend.to_user.email}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;
