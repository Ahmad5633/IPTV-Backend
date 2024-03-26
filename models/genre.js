import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },

},
{ timestamps: true });

export default mongoose.model("Book", schema);

