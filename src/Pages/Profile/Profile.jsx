import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { auth } from "../../firebase";
import { updateProfile, updateEmail } from "firebase/auth";

export default function Profile() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.displayName || "",
        email: user.email || "",
        phone: localStorage.getItem(`phone_${user.uid}`) || "",
        address: localStorage.getItem(`address_${user.uid}`) || "",
      });
    }
  }, [user]);

  if (!user) return <div>Você precisa estar logado.</div>;

  const handleChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    setStatus({ type: "loading", text: "Salvando..." });
    try {
      const current = auth.currentUser;
      if (!current) throw new Error("Usuário não disponível");

      if (form.name !== current.displayName) {
        await updateProfile(current, { displayName: form.name });
      }
     
      if (form.email && form.email !== current.email) {
        await updateEmail(current, form.email);
      }

      if (form.phone) localStorage.setItem(`phone_${current.uid}`, form.phone);
      if (form.address) localStorage.setItem(`address_${current.uid}`, form.address);

      setStatus({ type: "success", text: "Perfil atualizado." });
      setEditing(false);
    
      setTimeout(() => setStatus(null), 1800);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: err.message || "Erro ao atualizar" });
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <img src={user.photoURL} alt={user.displayName} />
        </div>
        <div className="profile-info">
              {!editing ? (
                <>
                  <h2>{user.displayName}</h2>
                  <p className="email">{user.email}</p>
                  {form.phone && <p className="detail-item">📞 {form.phone}</p>}
                  {form.address && <p className="detail-item">🏠 {form.address}</p>}
                  {user.metadata && user.metadata.creationTime && (
                    <p className="member-since">Membro desde {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                  )}

                  <div className="profile-actions">
                    <button className="btn-secondary" onClick={() => setEditing(true)}>Editar perfil</button>
                    <button className="btn-ghost" onClick={logout}>Sair</button>
                  </div>
                </>
              ) : (
                <div className="profile-edit">
                  <label>
                    Nome
                    <input placeholder="Seu nome completo" value={form.name} onChange={handleChange("name")} />
                  </label>
                  <label>
                    Email
                    <input placeholder="seu@email.com" value={form.email} onChange={handleChange("email")} />
                  </label>
                  <label>
                    Telefone
                    <input placeholder="(xx) xxxxx-xxxx" value={form.phone} onChange={handleChange("phone")} />
                  </label>
                  <label>
                    Endereço
                    <input placeholder="Rua, número - Bairro" value={form.address} onChange={handleChange("address")} />
                  </label>
                  <div className="profile-actions">
                    <button className="btn-primary" onClick={handleSave}>Salvar</button>
                    <button className="btn-ghost" onClick={() => { setEditing(false); setForm({ name: user.displayName || "", email: user.email || "", phone: localStorage.getItem(`phone_${user.uid}`) || "", address: localStorage.getItem(`address_${user.uid}`) || "", bio: localStorage.getItem(`bio_${user.uid}`) || "", website: localStorage.getItem(`website_${user.uid}`) || "" }); }}>Cancelar</button>
                  </div>
                  {status && <div className={`status ${status.type}`}>{status.text}</div>}
                </div>
              )}
        </div>
      </div>
    </div>
  );
}