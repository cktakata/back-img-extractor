import { model, Schema } from "mongoose";

const ImageSchema = new Schema(
  {
    hash: { type: String, required: true, index: true, unique: true },
    filename: { type: String, required: true },
    url: { type: String, required: true },
    data_criacao: { type: Date, default: Date.now },
    thumb: { type: String }
  },
  {
    strict: true,
    collection: "images"
  }
);

ImageSchema.pre("save", next => {
  const now = new Date();
  if (!this.data_criacao) {
    this.data_criacao = now;
  }
  next();
});

ImageSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    // console.log('Imagem duplicada');
    next();
  } else {
    next(error);
  }
});

export const imageModel = model("images", ImageSchema, "images");
