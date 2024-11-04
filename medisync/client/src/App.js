import React, { useEffect } from 'react';
// import { generateToken } from "./firebase/firebase";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login } from './pages';
function App() {
  useEffect(() => {
    // generateToken();
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
