import styles from '../styles/home.module.css';
// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';

import { Comment, FriendsList, Loader, CreatePost } from '../components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';

const Home = () => {
  // const navigate = useNavigate();

  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const posts = usePosts();
  const auth = useAuth();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.home}>
        <div className={styles.postsList}>
          <CreatePost />
          {posts.data.map((post) => (
            <div className={styles.postWrapper}>
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                  <img
                    src="https://www.mapheq.co.za/wp-content/uploads/2017/01/Profile-Pic-Demo-1.jpg"
                    alt="user-pic"
                  />
                  <div>
                    {/* <a
                  className={styles.postAuthor}
                  onClick={() => {
                    navigate(`/user/${post.user._id}`, {
                      state: { user: post.user },
                    });
                  }}
                >
                  {post.user.name}
                </a> */}
                    <Link
                      to={`/user/${post.user._id}`}
                      state={{
                        user: post.user,
                      }}
                      className={styles.postAuthor}
                    >
                      {post.user.name}
                    </Link>

                    <span className={styles.postTime}>a minute ago</span>
                  </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                  <div className={styles.postLike}>
                    <img
                      src="https://th.bing.com/th/id/OIP.WsKGEK1DMuhihqjWLVIuJAAAAA?pid=ImgDet&w=320&h=320&rs=1"
                      alt="likes-icon"
                    />
                    <span>{post.likes.length}</span>
                  </div>

                  <div className={styles.postCommentsIcon}>
                    <img
                      src="https://th.bing.com/th/id/R.a74221b93e775f16a58bf057e9bb90e8?rik=BESsAC7rg9DELA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_252622.png&ehk=Db70q9oNagVhpQGmyRdkjFKNMcNuW077dD98aRJUjQ4%3d&risl=&pid=ImgRaw&r=0"
                      alt="comments-icon"
                    />
                    <span>2</span>
                  </div>
                </div>
                <div className={styles.postCommentBox}>
                  <input placeholder="Start typing a comment" />
                </div>

                <div className={styles.postCommentsList}>
                  {post.comments.map((comment) => (
                    <Comment comment={comment} />
                  ))}
                </div>
                <div className={styles.postCommentsList}>
                  <div className={styles.postCommentsItem}>
                    <div className={styles.postCommentHeader}>
                      <span className={styles.postCommentAuthor}>Bill</span>
                      <span className={styles.postCommentTime}>
                        a minute ago
                      </span>
                      <span className={styles.postCommentLikes}>22</span>
                    </div>

                    <div className={styles.postCommentContent}>
                      Random comment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {auth.user && <FriendsList />}
      </div>
    </>
  );
};
// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };
export default Home;
