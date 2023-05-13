import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignOutButton() {
  const navigate = useNavigate();

  function signOutHandler() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }
  return <button onClick={signOutHandler}>Log out</button>;
}
