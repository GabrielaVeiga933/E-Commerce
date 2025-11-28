import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    // Simula pagamento; aqui você pode integrar Stripe/PayPal
    setTimeout(() => {
      clearCart();
      setProcessing(false);
      alert("Pagamento realizado com sucesso (simulado)!");
      navigate("/");
    }, 1200);
  };

  if (!cartItems.length) return <div>O carrinho está vazio.</div>;

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((it) => (
          <li key={it.id}>
            {it.name} x {it.qty} — R$ {(it.price * it.qty).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total: R$ {total.toFixed(2)}</p>
      <button onClick={handlePay} disabled={processing}>
        {processing ? "Processando..." : "Pagar (simulado)"}
      </button>
    </div>
  );
}
