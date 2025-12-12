// src/Pages/ProductPage/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { db } from "../../firebase"; // verifique caminho
import { doc, getDoc } from "firebase/firestore";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        // Ajuste "produtos" para "products" se sua coleção tiver outro nome
        const ref = doc(db, "produtos", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          if (!mounted) return;
          setProduct(null);
          setError("Produto não encontrado.");
        } else {
          const data = snap.data();
          // normaliza os campos para o formato esperado pelo UI
          const normalized = {
            id: snap.id,
            name: data.name ?? data.nome ?? "Produto",
            description: data.description ?? data.descricao ?? "",
            image: data.image ?? data.imagem ?? "",
            price: data.price ?? data.preco ?? 0,
            quantidade: data.quantidade ?? data.stock ?? 0,
            highlights: data.highlights ?? data.destaques ?? []
          };
          if (!mounted) return;
          setProduct(normalized);
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        if (!mounted) return;
        setError("Erro ao carregar o produto. Veja o console para detalhes.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      },
      qty
    );
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2400);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status" />
        <div className="mt-2">Carregando produto...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <h3>{error}</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center my-5">
        <h3>Produto não encontrado</h3>
      </div>
    );
  }

  const highlights = (product.highlights && product.highlights.length)
    ? product.highlights
    : ["Fórmula leve e confortável", "Alta pigmentação", "Longa duração durante o dia"];

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
          <div className="price">R$ {Number(product.price).toFixed(2)}</div>
          <div className="buy-controls">
            <input
              className="qty-input"
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            />
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
