import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { doLogOut, getCurrentUSerDetails, isLoggedIn } from '../auth';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  const navigate = useNavigate()

  // UseEffect to handle async data fetching
  useEffect(() => {
    // Async function inside useEffect to handle async logic
    const fetchUserDetails = async () => {
      setLogin(isLoggedIn());  // Check login status
      const userDetails = await getCurrentUSerDetails(); // Await the user details
      setUser(userDetails);  // Set the user details once fetched
    };

    fetchUserDetails(); // Call the async function
  }, []); // Empty dependency array to run this effect once

  const logout=()=>{
    doLogOut(()=>{
      setLogin(false);
      navigate("/")
    })
  }

  // Function to toggle navbar collapse
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">MyBlogs</a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar} // Toggle the navbar state
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen ? "true" : "false"} // Set the aria-expanded dynamically
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/createpost">Createpost</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/user/dashboard">MyPosts</NavLink>
            </li>
            {
              login && (
                <>
                <li className="nav-item">
                    <NavLink className="nav-link" to="user/profile-info">Profile info</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink onClick={logout} className="nav-link" >Logout</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">{user ? user.email : 'Loading...'}</NavLink>
                  </li>
                </>
              )
            }

            {
              !login && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                  </li>
                </>
              )
            }
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
