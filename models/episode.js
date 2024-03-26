import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    season_id: { type: mongoose.Schema.Types.ObjectId,ref:"Season", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    thumnail_id:{ type: mongoose.Schema.Types.ObjectId, ref: "File" },
},
{ timestamps: true });

export default mongoose.model("Episode", schema);
