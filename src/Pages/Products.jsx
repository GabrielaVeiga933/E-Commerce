import React from "react";
import products from "../data/products";
import { Link } from "react-router-dom";

export default function Products() {
  return (
    <section className="products">
      <h2>Produtos</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>R$ {p.price.toFixed(2)}</p>
            <Link to={`/product/${p.id}`}>Ver produto</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
