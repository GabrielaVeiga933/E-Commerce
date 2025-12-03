import React from "react";
import { Link } from "react-router-dom";

export default function BrandTemplate() {
  const handleExplore = (e) => {
    const el = document.querySelector('.products');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // otherwise let the Link navigate to /products
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
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8 6 4 7 4 11c0 5 8 11 8 11s8-6 8-11c0-4-4-5-8-9z" fill="currentColor" />
              </svg>
            </div>
            <div className="value-body">
              <h4>Ingredientes selecionados</h4>
              <p>Fórmulas testadas para conforto e longa duração, pensadas para a sua pele.</p>
            </div>
          </div>

          <div className="value">
            <div className="value-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21s-6-4.35-8.5-7.5C3 11 5 8 8 8c2 0 3 2 4 2s2-2 4-2c3 0 5 3 4.5 5.5C18 16.65 12 21 12 21z" fill="currentColor" />
              </svg>
            </div>
            <div className="value-body">
              <h4>Inclusividade</h4>
              <p>Produtos desenhados para todos os tons, tons e tipos de pele, com opções variadas.</p>
            </div>
          </div>

          <div className="value">
            <div className="value-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l2 5 5 .5-4 3 1.2 5L12 13l-4.2 2.5L9 10 5 7l5-.5L12 2z" fill="currentColor" />
              </svg>
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
