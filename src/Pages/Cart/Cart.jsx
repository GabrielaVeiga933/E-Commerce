import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, clearCart, total } = useCart();

  const totalItems = cartItems.reduce((s, it) => s + (it.qty || 0), 0);

  if (!cartItems.length)
    return (
      <div className="cart-empty text-center mt-5">
        <h2>Seu carrinho está vazio</h2>

        <Link to="/" className="btn btn-primary mt-3">
          Ver produtos
        </Link>
      </div>
    );

  return (
    <div className="cart container mt-4">
      <h2>Carrinho</h2>
      <div className="cart-grid row mt-3">
        <ul className="cart-list col-md-8">
          {cartItems.map((it) => (
            <li key={it.id} className="cart-item d-flex mb-4 p-3 border rounded">
              <img
                src={it.image}
                alt={it.name}
                className="me-3"
                style={{ width: 120, height: 120, objectFit: "cover" }}
              />

              <div className="cart-item-body flex-grow-1">
                <h3>
                  <Link to={`/product/${it.id}`} className="cart-link">
                    {it.name}
                  </Link>
                </h3>

                <p className="cart-price">Unit: R$ {it.price.toFixed(2)}</p>

                <div className="cart-controls d-flex align-items-center gap-3 mt-2">
                 
                  <Form.Control
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) =>
                      updateQty(it.id, Number(e.target.value))
                    }
                    style={{ width: "90px" }}
                  />

                  <Button
                    variant="outline-danger"
                    onClick={() => removeFromCart(it.id)}
                  >
                    Remover
                  </Button>
                </div>

                <div className="item-subtotal mt-2">
                  Subtotal: <strong>R$ {(it.price * it.qty).toFixed(2)}</strong>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="cart-summary col-md-4 p-4 border rounded h-fit">
          <h3>Resumo do pedido</h3>

          <ul className="summary-list mt-3">
            <li>
              Itens ({totalItems}): <span>R$ {total.toFixed(2)}</span>
            </li>
            <li>Frete: <span>Grátis</span></li>
            <li>Desconto: <span>- R$ 0.00</span></li>
          </ul>

          <p className="summary-total mt-3 mb-3 fs-5">
            Total a pagar: <strong>R$ {total.toFixed(2)}</strong>
          </p>

          <Link to="/checkout" className="btn btn-primary w-100">
            Finalizar compra
          </Link>
        </aside>
      </div>
    </div>
  );
}