import React from "react";
import products from "../../data/products";
import { Link } from "react-router-dom";
import ProductsCarousel from "../../Components/ProductsCarousel/ProductsCarousel";

function ProductCard({ p }) {
  return (
    <div className="product-card">
      <img src={p.image} alt={p.name} />
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <p>R$ {p.price.toFixed(2)}</p>
      <Link to={`/product/${p.id}`}>Ver produto</Link>
    </div>
  );
}

export default function Products() {
  return (
    <section className="products">
      <h2>Destaques</h2>

      <ProductsCarousel />

      <h2 style={{ marginTop: "2rem" }}>Todos os produtos</h2>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}