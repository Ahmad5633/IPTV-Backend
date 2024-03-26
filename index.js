import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import upload from "./middlewares/upload.js";

import userroutes from "./routes/user.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/", routes);
app.use("/user",userroutes);
dotenv.config();

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/public", express.static("public"));
app.post("/upload", upload.single("file"), (req, res) => {
    const downloadLink = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    // link will be like http://localhost:3000/public/IMG_20190720_123456.jpg

    // Return the download link to the client
    res.send("File uploaded successfully. Download link: " + downloadLink);
});

// app.post("/register",validate(userModel),async(req,res) => {
//     try {
//         const user = await UserModel.create(req.body);
//         res.send(user);
//     } catch (error){
//         res.status(500).send(error);
//     }
// });
const port = process.env.PORT || 3000; 
// If PORT environment variable is not set, then use 3000 as the default port

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

