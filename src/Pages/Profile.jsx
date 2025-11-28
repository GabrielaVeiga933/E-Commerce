import React from "react";
import { useAuth } from "../Context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <div>Você precisa estar logado.</div>;

  return (
    <div className="profile-page">
      <h2>Perfil</h2>
      <p>Nome: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt={user.displayName} width={80} />
      <div>
        <button onClick={logout}>Sair</button>
      </div>
    </div>
  );
}
