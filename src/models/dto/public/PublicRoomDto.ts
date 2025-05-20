import {PublicGroupDto} from "./PublicGroupDto.ts";

export type PublicRoomDto = {
  id: string,
  name: string,
  description: string,
  playersInRoomCount: number,
  playersLimit: number,
  template: string,
  groupId?: number,
  group?: PublicGroupDto,
  ownerId: string,
  tagOne?: string,
  tagTwo?: string,
  isPublic: boolean,
  thumbnail: string,
};