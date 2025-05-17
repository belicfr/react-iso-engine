import {PublicRoomDto} from "../../../../../models/dto/public/PublicRoomDto.ts";
import {RoomsListVisibility} from "./components/RoomsList.tsx";

export type TabCategory = {
  label: string,
  rooms: PublicRoomDto[],
};

export type TabData = {
  categories: TabCategory[],
  visibility: RoomsListVisibility,
};