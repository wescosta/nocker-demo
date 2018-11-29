import mongoose from "../utils/db.connection";
import paginate from "mongoose-paginate-v2";

const schema = new mongoose.Schema({
  title:    String,
  author:   String,
  markdown: String,
  thumbnailURL: String,
  tags: [{ type: [String] }],
  comments: [{ author: String, body: String, date: Date }],
  date: { type: Date, default: Date.now }
}).plugin(paginate);

const model = mongoose.model('Post', schema);

export default model;