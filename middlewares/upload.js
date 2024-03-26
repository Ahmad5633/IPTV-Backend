import multer from "multer";

// Here we are configuring how multer will store the file
const storage = multer.diskStorage({
    // detination is used to determine within which folder 📁 the uploaded files would be stored
    destination: (req, file, cb) => {
       // ⚠️ public folder 📁 must be created in the root directory of the project
        cb(null, "public/"); // 
    },
    // filename is used to determine what the file should be named inside the folder
    filename: (req, file, cb) => {
        cb(null, file.originalname); // For now, we are using the original name of the file
    },
});

// upload variable is a middleware that will be used in the route to store the file in the server
const upload = multer({ storage });

export default upload;