// src/Components/ProductsCarousel.jsx
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import products from "../../data/products";

const ProductsCarousel = () => {
  return (
    <Carousel
      className="custom-rb-carousel"
      fade
      interval={4000}
      pause={false}
      indicators
      controls
    >
      {products.map((p) => (
        <Carousel.Item key={p.id}>
   
          <div className="product-card">
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
            />
          </div>

          <Carousel.Caption className="bg-dark bg-opacity-50 p-2 rounded">
            <h5>{p.name}</h5>
            <p>{p.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;