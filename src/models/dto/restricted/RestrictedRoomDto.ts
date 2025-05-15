import {PublicRoomDto} from "../public/PublicRoomDto.ts";
import {PublicUserDto} from "../public/PublicUserDto.ts";

export type RestrictedRoomDto = PublicRoomDto & {
  rights: PublicUserDto[],
  bans: PublicUserDto[],
};