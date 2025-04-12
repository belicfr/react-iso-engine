import GameSocket from "./GameSocket.ts";

export default abstract class Listener {
  abstract handle(data: unknown): void;
};