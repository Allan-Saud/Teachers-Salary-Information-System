
// import React from "react";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// function NavBar() {
//     return (
//         <header>
//             <Navbar bg="dark" variant="dark">
//                 <Container>
//                     <Nav className="me-auto">
//                         <Nav.Link href="/">Home</Nav.Link>
//                         <Nav.Link href="Admin">Admin</Nav.Link>
//                         <Nav.Link href="User">User</Nav.Link>
//                     </Nav>
//                     <Nav className="ms-auto">
//                         <Nav.Link href="/">LogOut</Nav.Link>
//                     </Nav>
//                 </Container>
//             </Navbar>
//         </header>
//     );
// }

// export default NavBar;


import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Admin">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/User">
              User
            </Nav.Link>
          </Nav>
          {/* <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              LogOut
            </Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;


