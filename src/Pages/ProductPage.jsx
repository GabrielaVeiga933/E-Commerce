import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../Context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  if (!product) return <div>Produto não encontrado</div>;

  return (
    <div className="product-page">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>R$ {product.price.toFixed(2)}</p>
        <button onClick={() => addToCart(product, 1)}>Adicionar ao carrinho</button>
      </div>
    </div>
  );
}
