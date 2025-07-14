import React from 'react';
import ImageUpload from './ImageUpload';
import Info from './component/info';
import Footer from './component/Footer';

import './App.css'; // Make sure this is imported

function App() {
  return (
    <div className="App">
      <div className="section section-upload">
        <ImageUpload />
      </div>
      <div className="section section-info">
        <Info />
      </div>
      <div className="section-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
