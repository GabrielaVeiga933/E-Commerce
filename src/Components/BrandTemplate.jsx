import React from "react";
import { Link } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";
import { StarHalf } from "react-bootstrap-icons";

export default function BrandTemplate() {
  const handleExplore = (e) => {
    const el = document.querySelector('.products');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <>
      <section className="brand-hero">
        <div className="brand-hero-inner">
          <div className="brand-badge">Beleza Clara</div>
          <h1 className="brand-title">Beleza acessível, acabamento profissional</h1>
          <p className="brand-tagline">Descubra produtos criados para todas as peles — alta qualidade, sensorial leve e resultados que duram o dia todo.</p>
          <div className="hero-ctas">
            <Link className="btn-primary" to="/products" onClick={handleExplore}>Explorar produtos</Link>
          </div>
        </div>
      </section>

      <section className="brand-values">
        <div className="values-inner">
          <div className="value">
           <div className="value-icon" aria-hidden>
            <StarFill size={28} />
            </div>
            <div className="value-body">
              <h4>Ingredientes selecionados</h4>
              <p>Fórmulas testadas para conforto e longa duração, pensadas para a sua pele.</p>
            </div>
          </div>

          <div className="value">
            <div className="value-icon" aria-hidden>
             <StarFill size={28} />
            </div>
            <div className="value-body">
              <h4>Inclusividade</h4>
              <p>Produtos desenhados para todos os tons, tons e tipos de pele, com opções variadas.</p>
            </div>
          </div>

          <div className="value">
            <div className="value-icon" aria-hidden>
        <StarFill size={28} color="#FFD700" />

            </div>
            <div className="value-body">
              <h4>Sustentabilidade</h4>
              <p>Embalagens pensadas para reduzir impacto ambiental e diminuir desperdício.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
