import React from 'react';
import NavBar from '../NavFolder/Navbar';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();

  // Define routes where NavBar should be hidden
  const hideNavBarRoutes = [
    '/Adminpage',
    '/Register',
    '/Salary',
    '/View',
    '/Operation',
    '/ViewInd',
    '/EmailSender',
    "/Detail",
    '/UserSalary'
  ];

  // Check if the current route matches any route in hideNavBarRoutes
  const hideNavBar = hideNavBarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div>
      {!hideNavBar && <NavBar />}
      {children}
    </div>
  );
}

export default Layout;
