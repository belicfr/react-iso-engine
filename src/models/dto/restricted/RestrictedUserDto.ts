import {PublicUserDto} from "../public/PublicUserDto.ts";

export type RestrictedUserDto = PublicUserDto & {
  homeRoomId?: string,
  friends: string[],
};