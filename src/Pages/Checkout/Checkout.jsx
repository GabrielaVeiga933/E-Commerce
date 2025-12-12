
import React, { useState } from 'react';
import { useCart } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cartItems, total } = useCart();
  const [success, setSuccess] = useState(false);

  if (!cartItems.length)
    return (
      <div className="checkout-empty text-center mt-5">
        <h2>Seu carrinho está vazio</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Ver produtos
        </Link>
      </div>
    );

  if (success) {
    return (
      <div className="checkout-success-message">
        <div className="checkout-success-card">
          <h2>Pedido realizado com sucesso!</h2>
          <p>Obrigado por comprar conosco 💙</p>
          <Link to="/" className="btn btn-primary mt-3">Voltar para a loja</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-form-card">
      <h2>Finalizar Compra</h2>
      <p className="checkout-total">O total do seu pedido é: <strong>R$ {total.toFixed(2)}</strong></p>
      <div className="checkout-actions">
        <Link to="/cart" className="btn btn-secondary">
          Voltar para o Carrinho
        </Link>
        <button className="btn btn-primary" onClick={() => setSuccess(true)}>
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
}
