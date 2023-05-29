import express from "express";
import cors, { CorsOptions } from "cors";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import http from "http";
import messageRoutes from "./routes/messageRoutes";
import mongoose from "mongoose";
import messageModel from "./model/messageModel";

class App {
  public app: express.Application;
  public httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

  public constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);

    this.middleware();
    this.routes();
  }

  private enableCors() {
    const options: CorsOptions = {
      methods: "GET,PUT,POST,DELETE,PATCH",
      origin: "*",
    };
    this.app.use(cors(options));
  }

  private middleware() {
    mongoose
      .connect(
        "mongodb+srv://lidiagabrielly14:lidia123@cluster0.5gosdtu.mongodb.net/"
      )
      .then(() => console.log("oiiii"));
    this.enableCors();
    this.io = new Server(this.httpServer, {
      cors: {
        origin: "*",
      },
    });
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/message", messageRoutes);
  }
}

export default new App();
