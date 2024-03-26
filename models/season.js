import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    series_id: { type: mongoose.Schema.Types.ObjectId,ref:"Series", required: true },
    name: { type: String, required: true },
    discription: { type: String, required: true },
},
{ timestamps: true });

export default mongoose.model("Season", schema);
