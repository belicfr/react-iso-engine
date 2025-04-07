import {io, Socket} from "socket.io-client";

export default class GameSocket {
  private static instance: GameSocket;

  private _socket: Socket;

  private constructor() {
    this._socket = io("http://localhost:4000");
  };

  get socket(): Socket {
    return this._socket;
  }

  static get(): GameSocket {
    if (!GameSocket.instance) {
      GameSocket.instance = new GameSocket();
    }

    return GameSocket.instance;
  }

};