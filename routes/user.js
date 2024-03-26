import express from "express";
const router = express.Router();
import userModel from "../models/user.js";
import authenticate from "../middlewares/authenticate.js";
import jwt from "jsonwebtoken";

router.get("/", authenticate, async (req, res) => {
	try {
		const users = await userModel.find();
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get("/:id", authenticate, async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id);
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/registration", async (req, res) => {
	try {
		const user = await userModel.create(req.body);
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await userModel.findOne({
			email: req.body.email,
			password: req.body.password,
		});
		if (!user) return res.status(401).send("Invalid email or password.");
		const token = jwt.sign({ id: user._id }, "my_temporary_secret", {
			expiresIn: "1h",
		});
		res.send(token);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch("/:id", authenticate, async (req, res) => {
	try {
		const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete("/:id", authenticate, async (req, res) => {
	try {
		const user = await userModel.findByIdAndDelete(req.params.id);
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get("/:id/streams", async (req, res) => {
    try {
        const streams = await userModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "Stream",
                    localField: "_id",
                    foreignField: "User",
                    as: "Streams"
                }
            }
        ]);
        res.status(200).json(streams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:userId/streams/:streamId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const streamId = req.params.streamId;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const stream = await streamModel.findOne({ _id: streamId, User: userId });
        if (!stream) {
            return res.status(404).json({ message: "Stream not found for the user" });
        }

        res.status(200).json({ user, stream });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;



import express from "express";
import UserController from "../controllers/user.js";

const router = express.Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.get("/:id/streams",UserController.getStreams);
router.get("/:id/streams/:streamId",UserController.getStreamsById);
router.post("/registration", UserController.register);
router.post("/login",UserController.login);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;

POST /users/registration - Register a new user
POST /users/login - Login a user
GET /users - Get all users
GET /users/:id - Get a user by id
GET /users/:id/streams - Get all streams of a user by user id
GET /users/:id/streams/:streamId - Get a stream of a user by user id and stream id
PATCH /users/:id - Update a user by id
DELETE /users/:id - Delete a user by id
DELETE /users/:id/streams/:streamId - Delete a stream of a user by user id and stream id
Genres