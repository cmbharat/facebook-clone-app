import PropTypes from 'prop-types';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);

  const posts = usePosts();

  const handlePostLikeClick = async () => {
    console.log('like post');
    const response = await toggleLike(post._id, 'Post');
    if (response.success) {
      if (response.data.deleted) {
        console.log('like removed successfully');
      } else {
        console.log('like added successfully');
      }
    } else {
      console.log('error', response.message);
    }
  };

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);
      const response = await createComment(comment, post._id);
      if (response.success) {
        console.log('inside success handleAddComment');
        setComment('');
        posts.addComment(response.data.comment, post._id);
      } else {
        console.log('error', response.message);
      }
      setCreatingComment(false);
    }
  };

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://www.mapheq.co.za/wp-content/uploads/2017/01/Profile-Pic-Demo-1.jpg"
            alt="user-pic"
          />
          <div>
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
            <button onClick={handlePostLikeClick}>
              <img
                src="https://th.bing.com/th/id/OIP.WsKGEK1DMuhihqjWLVIuJAAAAA?pid=ImgDet&w=320&h=320&rs=1"
                alt="likes-icon"
              />
            </button>
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
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Post.propTypes = {
//   posts: PropTypes.object.isRequired,
// };

export default Post;
