import { Router } from "express";
import MessageController from "../controller/MessageController";
import { auth } from "../middleware/auth";
import { validation } from "../middleware/validation";
import { messageBodyValidation } from "../schema/message";

const routes = Router();

routes.get("/:id_to", auth, MessageController.getMessage);

routes.post(
  "/",
  auth,
  validation({ body: messageBodyValidation }),
  MessageController.storeMessage
);

export default routes;
