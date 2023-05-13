import "./App.css";
import React, { useEffect } from "react";
import Registry from "./components/layouts/Registry/Registry";
import SignIn from "./components/layouts/SignIn/SignIn";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  function checkIfLoggedIn() {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      navigate("/registry");
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/registry" element={<Registry />} />
      </Routes>
    </div>
  );
}

export default App;
