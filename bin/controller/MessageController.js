"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../services/Message"));
class MessageController {
    getMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                from: req.user.id_usuario,
                to: Number(req.params.id_to),
            };
            const get = yield Message_1.default.getMessage(data);
            return get ? res.status(200).json(get) : res.status(404).json({});
        });
    }
    storeMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                from: req.user.id_usuario,
                to: req.body.to,
                message: req.body.message,
            };
            const message = yield Message_1.default.sendMessage(data);
            return message ? res.status(201).json(message) : res.status(500).json({});
        });
    }
}
exports.default = new MessageController();
