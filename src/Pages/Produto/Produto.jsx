import { useState } from "react";
import { Container, Form, Button, Alert, Spinner, Image } from "react-bootstrap";
import { createProduct } from "../../firebase";

function Produto() {
  const [form, setForm] = useState({ nome: "", preco: "", quantidade: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [preview, setPreview] = useState(null); // data URL para mostrar preview

  // Atualiza campos do formulário
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // Função de upload: valida e converte para base64
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Validar tipo (apenas imagens)
    if (!file.type.startsWith("image/")) {
      setMessage({ type: "danger", text: "Por favor, selecione apenas arquivos de imagem." });
      return;
    }

    // Validar tamanho (máx 5MB)
    const MAX_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      setMessage({ type: "danger", text: "A imagem deve ter no máximo 5MB." });
      return;
    }

    // Ler o arquivo e armazenar como base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setForm(prev => ({ ...prev, image: base64 }));
      setUploadedFileName(file.name);
      setPreview(base64);
      setMessage({ type: "success", text: "Imagem carregada com sucesso!" });
    };
    reader.onerror = () => {
      setMessage({ type: "danger", text: "Erro ao ler o arquivo. Tente novamente." });
    };

    reader.readAsDataURL(file);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const produtoData = {
        nome: form.nome.trim(),
        image: form.image || "", // base64 ou string vazia

        preco: parseFloat(form.preco) || 0,
        quantidade: parseInt(form.quantidade, 10) || 0,
      };

      const id = await createProduct(produtoData); // usa a função do firebase.js
      setMessage({ type: "success", text: `Produto cadastrado com sucesso! ID: ${id}` });
      setForm({ nome: "",  preco: "", quantidade: "", image: "" });
      setUploadedFileName("");
      setPreview(null);
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

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Imagem (opcional)</Form.Label>
          <Form.Control
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
          {uploadedFileName && <small className="text-muted">Arquivo: {uploadedFileName}</small>}
          {preview && (
            <div style={{ marginTop: 10 }}>
              <Image src={preview} alt="preview" thumbnail style={{ maxWidth: 180 }} />
            </div>
          )}
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
