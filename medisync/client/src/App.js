import React, { useEffect } from "react";
import { generateToken } from "./firebase/firebase";

function App() {
  useEffect(() => {
    generateToken();
  }, []);
  return <h1>Medisync</h1>;
}

export default App;
