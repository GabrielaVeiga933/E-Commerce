import React from "react";
import { Link } from "react-router-dom";

export default function BrandTemplate() {
  return (
    <>
      <section className="brand-hero">
        <div className="brand-hero-inner">
          <div className="brand-badge">Beleza Clara</div>
          <h1 className="brand-title">Beleza acessível, acabamento profissional</h1>
          <p className="brand-tagline">Descubra produtos criados para todas as peles — alta qualidade, sensorial leve e resultados que duram o dia todo.</p>
          <div className="hero-ctas">
            <Link className="btn-primary" to="/">Explorar produtos</Link>
            <a className="btn-secondary" href="#sobre">Nossa proposta</a>
          </div>
        </div>
      </section>

      <section className="brand-values">
        <div className="values-inner">
          <div className="value">
            <h3>Ingredientes selecionados</h3>
            <p>Fórmulas testadas para conforto e longa duração.</p>
          </div>
          <div className="value">
            <h3>Inclusividade</h3>
            <p>Produtos para todos os tons e tipos de pele.</p>
          </div>
          <div className="value">
            <h3>Sustentabilidade</h3>
            <p>Embalagens pensadas para reduzir impacto ambiental.</p>
          </div>
        </div>
      </section>
    </>
  );
}
