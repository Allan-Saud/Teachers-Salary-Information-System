import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserPlus, FaEdit, FaEye } from 'react-icons/fa';
import AdminPageStyle from './AdminPage.module.css';

function Adminpage() {
  return (
    <Container className={AdminPageStyle.adminPage}>
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <h3 style={{ marginBottom: '20px' }}>Admin Panel</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Link to="/Register" className={AdminPageStyle.linkWithoutUnderline}>
            <Button variant="primary" className={AdminPageStyle.button}>
              <FaUserPlus className={AdminPageStyle.icon} /> Register
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Link to="/Salary" className={AdminPageStyle.linkWithoutUnderline}>
            <Button variant="info" className={AdminPageStyle.button}>
              <FaEdit className={AdminPageStyle.icon} /> Salary Operations
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Link to="/View" className={AdminPageStyle.linkWithoutUnderline}>
            <Button variant="success" className={AdminPageStyle.button}>
              <FaEye className={AdminPageStyle.icon} /> View
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
        <Link to="/" className={AdminPageStyle.linkWithoutUnderline}>
            <Button variant="danger" className={AdminPageStyle.button} >
              Logout
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Adminpage;
