import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { CloudArrowUp, Download } from "react-bootstrap-icons";
import Lottie from "lottie-react";
import animationData from "./assets/photo2.json"; // Lottie animation

function formatBytes(bytes) {
  const sizes = ["Bytes", "KB", "MB"];
  if (bytes === 0) return "0 Bytes";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [compression, setCompression] = useState("50"); // Default 50%

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    setError("");
    setLoading(true);
    setCompressedUrl(null);
    setCompressedSize(null);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("percent", compression);
    setImageSize(formatBytes(image.size));

    try {
      //const res = await axios.post("http://localhost:4000/compress", formData);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/compress`, formData);

      //const res =await axios.post("http://10.148.153.198:4000/compress", formData);

      const url = res.data.lossy_url;
      setCompressedUrl(url);

      const response = await axios.get(url, { responseType: "blob" });
      setCompressedSize(formatBytes(response.data.size));
    } catch (err) {
      console.error(err);
      setError("Compression failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center"
      style={{ background: "#fff4ed" }}
    >
      <Row className="w-100">
        {/* LEFT SIDE */}
        <Col md={6} className="d-flex flex-column justify-content-center px-5">
          <h1 className="display-4 fw-bold" style={{ color: "#3a1c1c" }}>
            Upload Your Image
            <br /> Compress It Instantly
          </h1>
          <p className="lead text-muted mb-4">
            Smart DCT-based lossy image compression with one click.
          </p>

          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="fw-semibold">Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setImageSize(formatBytes(file.size));
                    setCompressedUrl(null);
                    setCompressedSize(null);
                  }
                }}
                className="p-2"
              />
              {imageSize && (
                <Form.Text className="text-muted">
                  Original Size: {imageSize}
                </Form.Text>
              )}
            </Form.Group>

            {/* Compression Quality Selector */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Image Quality
              </Form.Label>
              <Form.Select
                value={compression}
                onChange={(e) => setCompression(e.target.value)}
                className="p-2"
              >
                <option value="25">25% - Low</option>
                <option value="50">50% - Balanced</option>
                <option value="75">75% - High</option>
              </Form.Select>
            </Form.Group>

            {/* Upload Button */}
            <div className="text-center">
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Uploading...
                  </>
                ) : (
                  <>
                    <CloudArrowUp className="me-2" />
                    Upload & Compress
                  </>
                )}
              </Button>
            </div>

            {error && (
              <Alert variant="danger" className="mt-3 text-center">
                {error}
              </Alert>
            )}
          </Form>

          {/* DOWNLOAD ONLY */}
          {compressedUrl && (
            <div className="mt-4 text-center">
              <h5>
                Compressed Image Ready{" "}
                {compressedSize && `(${compressedSize})`}
              </h5>
              <Button
  variant="outline-primary"
  className="mt-2"
  onClick={() => {
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.setAttribute('download', 'compressed_image.jpg'); // you can customize the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
>
  <Download className="me-1" />
  Download Compressed
</Button>

            </div>
          )}
        </Col>

        {/* RIGHT SIDE */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
        >
          <Lottie
            animationData={animationData}
            style={{ width: "90%", height: "auto" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ImageUpload;
