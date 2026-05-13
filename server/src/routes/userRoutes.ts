import { Router } from "express";
import { deleteUser, getUserById, listUsers, updateUser } from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { updateUserSchema, userIdParamSchema } from "../validators/userValidator.js";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter.get("/", authorize("admin"), listUsers);
userRouter.get("/:id", validate({ params: userIdParamSchema }), getUserById);
userRouter.patch("/:id", validate({ params: userIdParamSchema, body: updateUserSchema }), updateUser);
userRouter.delete("/:id", authorize("admin"), validate({ params: userIdParamSchema }), deleteUser);
