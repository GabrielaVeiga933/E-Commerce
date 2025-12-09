import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user, loginWithGoogle } = useAuth();

  if (user) return <Navigate to="/profile" />;

  return (
    <div className="login-page">
      <h2>Entrar</h2>
      <button onClick={loginWithGoogle}>Entrar com Google</button>
      <p>Também é possível implementar login por e-mail/senha.</p>
    </div>
  );
}