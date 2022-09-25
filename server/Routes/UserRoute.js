import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  unfollowUser,
  UpdateUser,
} from "../Controlllers/UserController.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   res.send("User Route");
// });

router.get("/:id", getUser);
router.put("/:id", UpdateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

export default router;
