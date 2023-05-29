import app from "./app";
import http from "http";
import debug from "debug";
import { Server } from "socket.io";
import { IPayload } from "./interfaces/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";

const port = normalizePort(process.env.PORT || "3000");
console.log(port);

app.io.on("connection", (socket) => {
    console.log(`CLIENTE CONECTADO ${socket.id}`);

    let decoded: IPayload = { id_usuario: 0, id_modo: 0, user_type: 'GERADOR' };

    if (!socket.handshake.auth || !socket.handshake.auth.token) socket.disconnect()

    try {
        decoded = jwt.verify(socket.handshake.auth.token, "secret") as IPayload;
        console.log(decoded);
    } catch (error) {
        socket.emit("InvalidToken", "token invalido");
        socket.disconnect();
    }

    try {
        socket.join(`user_${decoded.id_usuario}`)
    } catch (error) {
        socket.disconnect();
    }

    socket.on("send-msg", (data) => {
        socket.to(data.to).emit("msg-recieve", data.msg)
    })



});

app.httpServer.listen(port, () => console.log("App rodando"));

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}