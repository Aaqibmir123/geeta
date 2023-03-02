import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import { Authcontent } from './store/Authcontext';

export const Navbars = () => {
  const ctx = useContext(Authcontent);
  const logined = ctx.islogined;
  return (
   <>
    <Navbar bg="dark" variant="dark">
    <Container>
      <Link to ='/'><Navbar.Brand>Home</Navbar.Brand></Link>
      <Nav className="me-auto">
       {!logined && ( <Link to="/signup">
        signup
        </Link>)}
        {!logined && (<Link to='/login'>
        Login
        </Link>)}
       {logined &&  (
         <Link to='/welcome'>
         welcome
         </Link>
       )}
       
      {logined && (
        <Link to='/logout'>
        logout
        </Link>
      )}

      
     
        
      </Nav>
    </Container>
  </Navbar>
   
   </>
  )
}

