import GameSocket from "./GameSocket.ts";

export default abstract class Emit {
  abstract send(): void;
};