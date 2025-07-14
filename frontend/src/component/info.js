import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const Info = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">🧠 Compression Types</h2>
      <Row>
        {/* Lossy Compression Card */}
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0 hover-shadow rounded-4">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">Lossy Compression</Card.Title>
              <Card.Text>
                Lossy compression reduces file size by permanently removing some data. It achieves higher compression ratios, often used in multimedia files where perfect reconstruction isn’t required.
              </Card.Text>
              <div>
                <h6 className="mt-3">Techniques:</h6>
                <Badge bg="danger" className="me-2">DCT</Badge>
                <Badge bg="danger" className="me-2">DWT</Badge>
                <Badge bg="danger" className="me-2">MP3</Badge>
                <Badge bg="danger" className="me-2">Quantization</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Lossless Compression Card */}
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0 hover-shadow rounded-4">
            <Card.Body>
              <Card.Title className="text-success fw-bold">Lossless Compression</Card.Title>
              <Card.Text>
                Lossless compression reduces file size without losing any information. Original data can be perfectly reconstructed. Used in text, data files, and critical image applications.
              </Card.Text>
              <div>
                <h6 className="mt-3">Techniques:</h6>
                <Badge bg="success" className="me-2">Huffman</Badge>
                <Badge bg="success" className="me-2">Run-Length</Badge>
                <Badge bg="success" className="me-2">Prediction based</Badge>
                <Badge bg="success" className="me-2">PNG</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Info;
