import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { createProduct } from "../../firebase";


function Produto() {
  const [form, setForm] = useState({ nome: "", descricao: "", preco: "", quantidade: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const produtoData = {
        nome: form.nome.trim(),
        descricao: form.descricao.trim(),
        preco: parseFloat(form.preco) || 0,
        quantidade: parseInt(form.quantidade, 10) || 0,
      };

      const id = await createProduct(produtoData); // usa a função do firebase.js
      setMessage({ type: "success", text: `Produto cadastrado com sucesso! ID: ${id}` });
      setForm({ nome: "", descricao: "", preco: "", quantidade: "" });
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setMessage({ type: "danger", text: `Erro ao cadastrar produto: ${err.message}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="my-5">
      <h1>Cadastro de Produto</h1>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label>Nome do produto</Form.Label>
          <Form.Control
            name="nome"
            type="text"
            placeholder="Digite o nome do produto"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formQuantidade">
          <Form.Label>Quantidade em estoque</Form.Label>
          <Form.Control
            name="quantidade"
            type="number"
            placeholder="0"
            value={form.quantidade}
            onChange={handleChange}
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPreco">
          <Form.Label>Preço do produto (R$)</Form.Label>
          <Form.Control
            name="preco"
            type="number"
            placeholder="0.00"
            value={form.preco}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            name="descricao"
            as="textarea"
            rows={3}
            placeholder="Descreva o produto..."
            value={form.descricao}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Cadastrando...
            </>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default Produto;
