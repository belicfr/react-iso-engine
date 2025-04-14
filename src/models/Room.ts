import User from "./User.ts";
import RoomTemplate from "./RoomTemplate.ts";

export class RoomRepository {
  static instance: RoomRepository;

  rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  findById(id: number): Room|null {
    return this.rooms.find(room => room.id === id)
      ?? null;
  }


  static i() {
    if (!RoomRepository.instance) {
      RoomRepository.instance = new RoomRepository();
    }

    return RoomRepository.instance;
  };
}

export default class Room {
  id: number;
  name: string;
  description: string;
  owner: User;
  tags: RoomTags;
  playersLimit: number;

  playersCount: number;

  template: RoomTemplate;

  bannedUsers: User[];
  havingRightsUsers: User[];

  bannedWords: string[];

  constructor(
    id: number,
    name: string,
    description: string,
    owner: User,
    tags: RoomTags,
    playersLimit: number,
    playersCount: number = 0,
    template: RoomTemplate) {

    this.id = id;
    this.name = name;
    this.description = description;

    this.owner = owner;
    this.tags = tags;
    this.playersLimit = playersLimit;

    this.playersCount = playersCount;

    this.template = template;

    this.bannedUsers = [];
    this.havingRightsUsers = [];

    this.bannedWords = [];
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