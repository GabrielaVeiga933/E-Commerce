import { useAuth } from "../Context/AuthContext";
 
const Header = () => {
  const { user, loginWithGoogle, logout } = useAuth();
 
  return (
  <header className="header">
    <h1>Meu App com Login Google</h1>
    <div style={{ marginLeft: "auto" }}>
    {user ? (
      <>
      <span style={{ marginRight: "1rem" }}>
        Olá, {user.displayName || user.email}
      </span>
      <button onClick={logout}>Sair</button>
      </>
    ) : (
      <button onClick={loginWithGoogle}>
      Entrar com Google
      </button>
    )}
    </div>
  </header>
  );
};
 
export default Header;