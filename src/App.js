import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import UserDashBoard from './user-routes/UserDashBoard';
import PrivateRoute from './components/PrivateRoute';
import ProfileInfo from './user-routes/ProfileInfo';
import PostPage from './pages/PostPage';
import AddPost from './components/AddPost';
import Categories from './pages/Categories';
import UpdateBlog from './components/UpdateBlog';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/createpost" element={<AddPost />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/categories/:categoryId" element={<Categories />} />

       
          <Route path="/user" element={<PrivateRoute />}></Route>
            <Route path="/user/dashboard" element={<UserDashBoard />} />
            <Route path="profile-info" element={<ProfileInfo />} />
            <Route path="user/update/:postId" element={<UpdateBlog />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

