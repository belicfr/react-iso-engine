import User from "./User.ts";

export default class Room {
  id: number;
  name: string;
  description: string;
  owner: User;
  tags: RoomTags;
  playersLimit: number;

  playersCount: number;

  // TODO: replace by floor blueprint system
  size: GridSize;

  constructor(
    id: number,
    name: string,
    description: string,
    owner: User,
    tags: RoomTags,
    playersLimit: number,
    playersCount: number = 0,
    size: GridSize) {

    this.id = id;
    this.name = name;
    this.description = description;

    this.owner = owner;
    this.tags = tags;
    this.playersLimit = playersLimit;

    this.playersCount = playersCount;

    this.size = size;
  }

  getPopulationLevel(): RoomPopulation {
    const max: number = this.playersLimit;
    const lowLimit: number = max / 3;
    const mediumLimit: number = lowLimit * 2;

    if (this.playersCount > 0
               && this.playersCount <= lowLimit) {

      return RoomPopulation.LOW;
    } else if (this.playersCount > lowLimit
               && this.playersCount <= mediumLimit) {

      return RoomPopulation.MEDIUM;
    } else if (this.playersCount > mediumLimit) {
      return RoomPopulation.HIGH;
    }

    return RoomPopulation.NONE;
  }
};

type RoomTags = [string?, string?];

export enum RoomPopulation {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export type GridSize = {
  cols: number,
  rows: number,
};