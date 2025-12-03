import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, clearCart, total } = useCart();

  const totalItems = cartItems.reduce((s, it) => s + (it.qty || 0), 0);

  if (!cartItems.length)
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio</h2>
        <Link to="/" className="btn-primary">Ver produtos</Link>
      </div>
    );

  return (
    <div className="cart">
      <h2>Carrinho</h2>
      <div className="cart-grid">
        <ul className="cart-list">
          {cartItems.map((it) => (
            <li key={it.id} className="cart-item">
              <img src={it.image} alt={it.name} />
              <div className="cart-item-body">
                <h3><Link to={`/product/${it.id}`} className="cart-link">{it.name}</Link></h3>
                <p className="cart-price">Unit: R$ {it.price.toFixed(2)}</p>
                <div className="cart-controls">
                  <input
                    className="qty-input"
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) => updateQty(it.id, Number(e.target.value))}
                  />
                  <button className="btn-ghost" onClick={() => removeFromCart(it.id)}>Remover</button>
                </div>
                <div className="item-subtotal">Subtotal: <strong>R$ {(it.price * it.qty).toFixed(2)}</strong></div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h3>Resumo do pedido</h3>
          <ul className="summary-list">
            <li>Itens ({totalItems}): <span>R$ {total.toFixed(2)}</span></li>
            <li>Frete: <span>Grátis</span></li>
            <li>Desconto: <span>- R$ 0.00</span></li>
          </ul>
          <p className="summary-total">Total a pagar: R$ {total.toFixed(2)}</p>
          <Link to="/checkout" className="btn-primary">Finalizar compra</Link>
        </aside>
      </div>
    </div>
  );
}
