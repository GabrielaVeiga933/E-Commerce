import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, total } = useCart();

  if (!cartItems.length)
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio</h2>
        <Link to="/">Ver produtos</Link>
      </div>
    );

  return (
    <div className="cart">
      <h2>Carrinho</h2>
      <ul>
        {cartItems.map((it) => (
          <li key={it.id} className="cart-item">
            <img src={it.image} alt={it.name} />
            <div>
              <h3>{it.name}</h3>
              <p>R$ {it.price.toFixed(2)}</p>
              <input
                type="number"
                min="1"
                value={it.qty}
                onChange={(e) => updateQty(it.id, Number(e.target.value))}
              />
              <button onClick={() => removeFromCart(it.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>Total: R$ {total.toFixed(2)}</p>
        <Link to="/checkout">Finalizar compra</Link>
      </div>
    </div>
  );
}
