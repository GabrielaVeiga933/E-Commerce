import React from "react";
import BrandTemplate from "../../Components/BrandTemplate/BrandTemplate";
import Products from "../Products/Products";

export default function Home() {
  return (
    <main>
      <BrandTemplate />
      <div className="main-content">
        <Products />
      </div>
    </main>
  );
}