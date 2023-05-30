"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const port = normalizePort(process.env.PORT || "3000");
console.log(port);
app_1.default.io.on("connection", (socket) => {
    console.log(`CLIENTE CONECTADO ${socket.id}`);
    let decoded = { id_usuario: 0, id_modo: 0, user_type: "GERADOR" };
    if (!socket.handshake.auth || !socket.handshake.auth.token)
        socket.disconnect();
    try {
        decoded = jsonwebtoken_1.default.verify(socket.handshake.auth.token, "secret");
        console.log(decoded);
    }
    catch (error) {
        socket.emit("InvalidToken", "token invalido");
        socket.disconnect();
    }
    try {
        socket.join(`user_${decoded.id_usuario}`);
    }
    catch (error) {
        socket.disconnect();
    }
    socket.on("send-msg", (data) => {
        socket.to(`user_${data.to}`).emit("msg-recieve", data.msg);
    });
});
app_1.default.httpServer.listen(port, () => console.log("App rodando"));
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
