import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    original_name: { type: String, required: true },
    current_name: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: String, required: true },
}, 
 { timestamps: true }
);

export default mongoose.model("File", schema);
