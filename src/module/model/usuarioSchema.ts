import { model, Schema } from "mongoose";

const UsuarioSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefones: { type: Array },
    data_criacao: { type: Date, default: Date.now },
    data_atualizacao: { type: Date, default: Date.now },
    ultimo_login: { type: Date, default: Date.now },
    token: { type: String },
  },
  {
    strict: true,
    collection: "usuarios"
  }
);

UsuarioSchema.pre("save", next => {
  const now = new Date();
  if (!this.data_criacao) {
    this.data_criacao = now.getUTCDate();
  }
  this.data_atualizacao = now.getUTCDate();
  next();
});

export const usuarioModel = model("usuarios", UsuarioSchema, "usuarios");
