import { Home, Login } from '../pages';
import { Loader, Navbar } from '/';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks';
import Signup from '../pages/Signup';

function App() {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
