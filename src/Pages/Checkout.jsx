import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    address: "",
    paymentMethod: "card",
  });

  const [errors, setErrors] = useState({});

  if (!cartItems.length) return <div className="checkout-empty">O carrinho está vazio.</div>;

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Nome é obrigatório";
    if (!form.email) e.email = "Email é obrigatório";
    if (!form.address) e.address = "Endereço é obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (k) => (ev) => setForm((f) => ({ ...f, [k]: ev.target.value }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setProcessing(true);

    setTimeout(() => {
      const order = {
        id: Date.now().toString(36),
        items: cartItems,
        total,
        customer: { name: form.name, email: form.email, address: form.address },
        paid: true,
        createdAt: new Date().toISOString(),
      };

      clearCart();
      setProcessing(false);

      alert(`Pedido ${order.id} confirmado! Total R$ ${total.toFixed(2)}`);
      navigate("/");
    }, 900);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Informações essenciais</h3>
          <label>
            Nome
            <input value={form.name} onChange={handleChange("name")} />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>
          <label>
            Email
            <input value={form.email} onChange={handleChange("email")} />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>

          <label>
            Endereço (rua, número)
            <input value={form.address} onChange={handleChange("address")} />
            {errors.address && <small className="error">{errors.address}</small>}
          </label>

          <label>
            Método de pagamento
            <select value={form.paymentMethod} onChange={handleChange("paymentMethod")}>
              <option value="card">Cartão de crédito</option>
              <option value="pix">PIX</option>
            </select>
          </label>

          <button className="btn-primary" type="submit" disabled={processing}>
            {processing ? "Processando..." : `Pagar R$ ${total.toFixed(2)}`}
          </button>
        </form>

        <aside className="checkout-summary">
          <h3>Resumo do pedido</h3>
          <ul>
            {cartItems.map((it) => (
              <li key={it.id}>
                {it.name} x {it.qty} — R$ {(it.price * it.qty).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="summary-total">Total: R$ {total.toFixed(2)}</p>
        </aside>
      </div>
    </div>
  );
}
