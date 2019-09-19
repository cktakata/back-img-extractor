import { model, Schema } from "mongoose";

const UsuarioSchema = new Schema(
  {
    userid: { type: String, required: true, index: true, unique: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
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
    this.data_criacao = now;
  }
  this.data_atualizacao = now;
  next();
});

export const usuarioModel = model("usuarios", UsuarioSchema, "usuarios");
