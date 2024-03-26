import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    episode_id: { type: mongoose.Schema.Types.ObjectId,ref:"Episode", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    time: { type: String, required: true },
},
{ timestamps: true });

export default mongoose.model("Stream", schema);
