"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSocket = void 0;
const commentSocket_1 = require("./sockets/commentSocket");
const socket_io_1 = require("socket.io");
const likeSocket_1 = require("./sockets/likeSocket");
class MainSocket {
    constructor(server) {
        this.onDisconnect = () => {
        };
        this.onError = (error) => {
            console.log("ERROR", error);
        };
        this.io = new socket_io_1.Server(server);
    }
    onEvents() {
        this.io.on('connection', (socket) => {
            socket.on('disconnect', this.onDisconnect);
            socket.on('error', this.onError);
            new commentSocket_1.CommentSocket(this.io, socket).onEvents();
            new likeSocket_1.LikeSocket(this.io, socket).onEvents();
        });
    }
}
exports.MainSocket = MainSocket;
