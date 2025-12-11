
import React from 'react';
import { useCart } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cartItems, total } = useCart();

  if (!cartItems.length)
    return (
      <div className="checkout-empty text-center mt-5">
        <h2>Seu carrinho está vazio</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Ver produtos
        </Link>
      </div>
    );

  return (
    <div className="checkout container mt-4">
      <h2>Finalizar Compra</h2>
      <p>O total do seu pedido é: <strong>R$ {total.toFixed(2)}</strong></p>
      
      {/* Aqui o usuário deve adicionar a lógica de formulário de pagamento e endereço */}
      <div className="alert alert-info">
        <p><strong>Atenção:</strong> Este é um placeholder para a página de Checkout.</p>
        <p>O botão "Finalizar Compra" na página do carrinho agora está funcionando e direciona para esta página.</p>
        <p>Você pode adicionar aqui o formulário de endereço, opções de frete e o processamento de pagamento.</p>
      </div>

      <Link to="/cart" className="btn btn-secondary mt-3">
        Voltar para o Carrinho
      </Link>
      
      {/* Exemplo de botão para simular a finalização */}
      <button className="btn btn-success mt-3 ms-3" onClick={() => alert('Simulação de Finalização de Pedido!')}>
        Confirmar Pagamento (Simulação)
      </button>
    </div>
  );
}
