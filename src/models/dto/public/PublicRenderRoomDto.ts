import {PublicRoomDto} from "./PublicRoomDto.ts";
import {PublicUserDto} from "./PublicUserDto.ts";

export type PublicRenderRoomDto = PublicRoomDto & {
  playersInRoom: PublicUserDto[],
};