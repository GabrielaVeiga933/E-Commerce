
import React from 'react';
import { useCart } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cartItems, total } = useCart();

  if (!cartItems.length)
    return (
      <div className="checkout-empty text-center mt-5">
        <h2>Seu carrinho está vazio</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Ver produtos
        </Link>
      </div>
    );

  return (
    <div className="checkout container mt-4">
      <h2>Finalizar Compra</h2>
      <p>O total do seu pedido é: <strong>R$ {total.toFixed(2)}</strong></p>
      
      <Link to="/cart" className="btn btn-secondary mt-3">
        Voltar para o Carrinho
      </Link>
      
  
      <button className="btn btn-success mt-3 ms-3" onClick={() => alert('Simulação de Finalização de Pedido!')}>
        Confirmar Pagamento 
      </button>
    </div>
  );
}
