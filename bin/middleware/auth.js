"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "Não autotizado" });
    }
    const [, token] = authorization.split(" ");
    console.log(token);
    try {
        const data = jsonwebtoken_1.default.verify(token, "secret");
        req.user = data;
        return next();
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "Não autorizado" });
    }
};
exports.auth = auth;
