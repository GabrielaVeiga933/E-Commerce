import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <div className="notfound-icon">😕</div>
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>A página que você procura não existe ou foi removida.</p>
        <Link to="/" className="btn btn-primary notfound-btn">Voltar para a Página Inicial</Link>
      </div>
    </div>
  );
};

export default NotFound;