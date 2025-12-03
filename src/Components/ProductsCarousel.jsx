// src/Components/ProductsCarousel.jsx
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import products from "../data/products";

const ProductsCarousel = () => {
  return (
    <Carousel fade interval={4000} pause={false}>
      {products.map((p) => (
        <Carousel.Item key={p.id}>
          <img
            className="d-block w-100"
            src={p.image}
            alt={p.name}
          style={{ objectFit: "cover", height: "900px", width: "800px" }}

          />
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
