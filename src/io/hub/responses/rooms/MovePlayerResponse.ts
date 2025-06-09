import {PublicUserDto} from "../../../../models/dto/public/PublicUserDto.ts";
import {Coord2D} from "../../../../game/room-view/engine/precepts/Coord2D.ts";

export type MovePlayerResponse = [PublicUserDto|null, Coord2D[]|null];