import React from "react";
import BrandTemplate from "../Components/BrandTemplate";
import Products from "./Products";

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
