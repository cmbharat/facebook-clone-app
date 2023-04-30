import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api/index';
import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);

  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);
    console.log('inside handlepost click', post);
    const response = await addPost(post);
    if (response.success) {
      setPost('');
      posts.addPostsToState(response.data.post);
      console.log(response);
    } else {
      console.log('Error', response);
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding Post' : 'Add Post'}
        </button>
      </div>
    </div>
  );
};
export default CreatePost;
