// src/Pages/Products/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { db } from "../../firebase"; // certifique-se que exporta `db`
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import ProductsCarousel from "../../Components/ProductsCarousel/ProductsCarousel";

function ProductCard({ p }) {
  const name = p.name ?? p.nome ?? "Produto";
  const description = p.description ?? p.descricao ?? "";
  const price = p.price ?? p.preco ?? 0;
  const image = p.image ?? p.imagem ?? p.foto ?? "";

  return (
    <Card className="product-card h-100">
      {image ? (
        <Card.Img
          variant="top"
          src={image}
          alt={name}
        />
      ) : (
        <div
          style={{
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.02)",
            borderRadius: 12,
            marginBottom: "1.1rem",
            color: "#fff",
            fontWeight: 600
          }}
        >
          Sem imagem
        </div>
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="flex-grow-1">
          {description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <strong>R$ {Number(price).toFixed(2)}</strong>
          <Link to={`/product/${p.id}`} className="btn btn-primary btn-sm">
            Ver produto
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // referência para a coleção. Ajuste o nome da coleção se usar "products" em vez de "produtos"
    const produtosRef = collection(db, "produtos");

    // Query opcional: por exemplo ordena por criadoEm (criado no momento do cadastro)
    // const q = query(produtosRef, orderBy("criadoEm", "desc"));
    const q = query(produtosRef, orderBy("criadoEm", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(lista);
        setLoading(false);
      },
      (err) => {
        console.error("Erro ao ler produtos do Firestore:", err);
        setError("Erro ao carregar produtos. Verifique o console.");
        setLoading(false);
      }
    );

    // cleanup
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
        <div className="mt-2">Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center my-5">
        <h3>Nenhum produto encontrado</h3>
        <p className="text-muted">Ainda não há produtos cadastrados na loja.</p>
        <Link to="/" className="btn btn-primary">Ir para início</Link>
      </div>
    );
  }

  return (
    <section className="products">
      <h2>Destaques</h2>

      <ProductsCarousel products={products.slice(0, 6)} /> 

      <h2 style={{ marginTop: "2rem" }}>Todos os produtos</h2>

      <Row className="product-grid g-3">
        {products.map((p) => (
          <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard p={p} />
          </Col>
        ))}
      </Row>
    </section>
  );
}
