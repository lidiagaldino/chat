"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageController_1 = __importDefault(require("../controller/MessageController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const message_1 = require("../schema/message");
const routes = (0, express_1.Router)();
routes.get("/:id_to", auth_1.auth, MessageController_1.default.getMessage);
routes.post("/", auth_1.auth, (0, validation_1.validation)({ body: message_1.messageBodyValidation }), MessageController_1.default.storeMessage);
exports.default = routes;
