import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from '/';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useAuth } from '../hooks';

function PrivateRoute({ children }) {
  // console.log(children);
  const auth = useAuth();
  return auth.user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  const auth = useAuth();

  console.log('auth', auth);

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
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
