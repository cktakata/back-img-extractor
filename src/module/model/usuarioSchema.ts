import { model, Schema } from "mongoose";

const UsuarioSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefones: { type: Array },
    signupDate: { type: Date, default: Date.now }
  },
  {
    strict: true,
    collection: "usuarios"
  }
);

UsuarioSchema.pre("save", next => {
  const now = new Date();
  if (!this.signupDate) {
    this.signupDate = now.getUTCDate;
  }
  next();
});

export const usuarioModel = model("usuarios", UsuarioSchema, "usuarios");
