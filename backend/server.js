require('dotenv').config(); // at the to
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Enable CORS for frontend (default allows all)
app.use(cors());

// File upload destination
const upload = multer({ dest: 'uploads/' });

// Test route
app.get('/home', (req, res) => {
  res.send('<h1>Hello</h1>');
});

// Compress endpoint
app.post('/compress', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file received' });
    }
  
    const inputPath = req.file.path;
    const outputLossy = `${inputPath}_lossy.jpg`;
  
    // ✅ Ensure req.body.percent is parsed
    const compressionPercent = req.body.percent || 25;
  
    console.log("Compression percent received from client:", compressionPercent);
  
    const python = spawn('python3', [
      'compress.py',
      inputPath,
      outputLossy,
      compressionPercent.toString()
    ]);
  
    // Logging for debug
    python.stdout.on('data', (data) => {
      console.log('Python output:', data.toString());
    });
  
    python.stderr.on('data', (data) => {
      console.error('Python error:', data.toString());
    });
  
    python.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: 'Compression failed' });
      }
  
      res.json({
        lossy_url: `${BASE_URL}/${path.basename(outputLossy)}`
      });
    });
  });
  


// Serve static files (images) from /uploads
app.use(express.static('uploads'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
});
