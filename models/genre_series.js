import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    genre_id: { type: mongoose.Schema.Types.ObjectId,ref:"Genre", required: true },
    series_id: { type: mongoose.Schema.Types.ObjectId,ref:"Series", required: true },
},
{ timestamps: true });

export default mongoose.model("GnereSeries", schema);
