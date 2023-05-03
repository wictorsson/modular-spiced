import mongoose from "mongoose";

const { Schema } = mongoose;

const patchSchema = new Schema({
  name: { type: String, required: true },
  nodes: { type: Array, required: true },
  edges: { type: Array, required: true },
  user_email: { type: String, required: true },
});

const Patch = mongoose.models.Patch || mongoose.model("Patch", patchSchema);

export default Patch;
