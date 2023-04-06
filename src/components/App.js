import { getPosts } from '../api';
import { useEffect, useState } from 'react';
import { Home } from '../pages';
import { Loader, Navbar } from '/';
// import Navbar from './Navbar';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <div>
        <Navbar />
        <Home posts={posts} />
      </div>
    </div>
  );
}

export default App;
