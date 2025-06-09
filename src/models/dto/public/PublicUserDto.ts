import {Coord2D} from "../../../game/room-view/engine/precepts/Coord2D.ts";

export type PublicUserDto = {
  id: string,
  userName: string,
  normalizedUserName: string,
  crowns?: number,
  position: Coord2D,
  tileCoord: Coord2D,
};