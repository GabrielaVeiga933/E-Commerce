import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products";
import { useCart } from "../../Context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);

  const highlights = product?.highlights || [
    "Fórmula leve e confortável",
    "Alta pigmentação",
    "Longa duração durante o dia"
  ];

  const [showToast, setShowToast] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2400);
  };
  if (!product) return <div>Produto não encontrado</div>;

  return (
    <div className="product-page">
      <div className="product-media">
        <div className="product-gallery">
          <img className="product-main" src={product.image} alt={product.name} />
        </div>
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>
        <div className="rating">★★★★☆ <span className="rating-count">(128)</span></div>
        <p className="product-desc">{product.description}</p>

        <ul className="product-highlights">
          {highlights.map((h, idx) => (
            <li key={idx}>{h}</li>
          ))}
        </ul>

        <div className="product-buy">
          <div className="price">R$ {product.price.toFixed(2)}</div>
          <div className="buy-controls">
            <input className="qty-input" type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value) || 1)} />
            <button className="btn-primary" onClick={handleAdd}>Adicionar ao carrinho</button>
          </div>
        </div>

        {showToast && (
          <div className="toast">Produto adicionado ao carrinho</div>
        )}
      </div>
    </div>
  );
}