"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = http_1.default.createServer(this.app);
        this.middleware();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET,PUT,POST,DELETE,PATCH",
            origin: "*",
        };
        this.app.use((0, cors_1.default)(options));
    }
    middleware() {
        mongoose_1.default
            .connect("mongodb+srv://lidiagabrielly14:lidia123@cluster0.5gosdtu.mongodb.net/")
            .then(() => console.log("oiiii"));
        this.enableCors();
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: "*",
            },
        });
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use("/message", messageRoutes_1.default);
    }
}
exports.default = new App();
