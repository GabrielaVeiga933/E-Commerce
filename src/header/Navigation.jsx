import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const STORE_NAME = "Beleza Clara";

function Navigation() {
  const { user } = useAuth();
  return (
    <header className="topbar">
      <div className="brand">
        <img 
          src="/logo.png" 
          alt="Beleza Clara" 
          className="brand-logo" 
        />
        <span className="brand-name">{STORE_NAME}</span>
      </div>
      <nav className="navigation">
        <Link className="nav-link" to="/">Produtos</Link>
        <Link className="nav-link" to="/Produto">Cadastrar Produto</Link>
        <Link className="nav-link" to="/cart">Carrinho</Link>

        {user ? (
          <Link className="nav-link" to="/profile">Perfil</Link>
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Navigation;