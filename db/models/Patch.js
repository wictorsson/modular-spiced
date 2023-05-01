import mongoose from "mongoose";

const { Schema } = mongoose;

const patchSchema = new Schema({
  name: { type: String, required: true },
});

const Patch = mongoose.models.Patch || mongoose.model("Patch", patchSchema);

export default Patch;
