// import React from 'react'
// import { Outlet,Navigate } from 'react-router-dom';
// import { isLoggedIn } from '../auth';
// import Base from './Base';

// const PrivateRoute = () => {

   
//     // if(isLoggedIn){
//     //     return <Outlet />
//     // }
//     // else{
//     //     return <Navigate to={"/login"} />
//     // }

//   return (
//     <Base>
//     <div>PrivateRoute</div>
//     </Base>
//   )
// }

// export default PrivateRoute

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isLoggedIn } from '../auth';
import Base from './Base';

const PrivateRoute = () => {
  // Check if the user is logged in
  if (isLoggedIn()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
