import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Linkedin } from 'react-bootstrap-icons';

function Footer() {
  return (
    <div
      style={{
        background: 'linear-gradient(225deg,rgba(50, 25, 25, 0.68)  20%,#754C47  90%)',
        color: 'white',
        padding: '40px',
        paddingBottom: '60px'
      }}
    >
      <Container>
        <Row className="text-center text-md-start">
          {/* Left Side: Copyright & Name */}
          <Col md={6} className="mb-3 mb-md-0">
            <h5 className="mb-2">© {new Date().getFullYear()} All rights reserved</h5>
            <p className="mb-0">
              Created by <strong>Vicky Kumar</strong>
            </p>
          </Col>

          {/* Right Side: Email & LinkedIn */}
          <Col
            md={6}
            className="d-flex flex-column align-items-center align-items-md-end justify-content-center"
          >
            <p className="mb-1">
              📧{' '}
              <a
                href="mailto:Vickykumar1347@gmail.com"
                style={{ color: '#f7c08a' }}
              >
                Vickykumar1347@gmail.com
              </a>
            </p>
            <a
              href="https://www.linkedin.com/in/vicky-kumar-850370229/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#f7c08a', textDecoration: 'none' }}
            >
              <Linkedin className="me-2" size={20} />
              LinkedIn Profile
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
