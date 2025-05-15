import User, {UserRepository} from "./User.ts";
import RoomTemplate, {RoomTemplateRepository} from "./RoomTemplate.ts";
import Group, {GroupRepository} from "./Group.ts";

export class RoomRepository {
  static instance: RoomRepository;

  rooms: Room[];

  constructor() {
    this.rooms = [
      new Room(
        1,
        "Test",
        "",
        UserRepository.i().findById(1)!,
        [],
        10,
        RoomAccessMode.OPEN,
        0,
        [],
        RoomTemplateRepository.i().findById(1)!,
        GroupRepository.i().findById(1)!)
    ];
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
  static PUBLIC_ROOM: string = "Public Room";

  id: number;
  name: string;
  description: string;
  owner: User;
  tags: RoomTags;
  playersLimit: number;
  accessMode: RoomAccessMode;

  playersInRoomCount: number;
  playersInRoom: User[];

  template: RoomTemplate;

  bannedUsers: User[];
  havingRightsUsers: User[];

  bannedWords: string[];

  group: Group|null;

  isPublicRoom: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    owner: User,
    tags: RoomTags,
    playersLimit: number,
    accessMode: RoomAccessMode = RoomAccessMode.OPEN,
    playersInRoomCount: number = 0,
    playersInRoom: User[] = [],
    template: RoomTemplate,
    group: Group|null = null,
    isPublicRoom: boolean = false) {

    this.id = id;
    this.name = name;
    this.description = description;

    this.owner = owner;
    this.tags = tags;
    this.playersLimit = playersLimit;

    this.accessMode = accessMode;

    this.playersInRoomCount = playersInRoomCount;
    this.playersInRoom = playersInRoom;

    this.template = template;

    this.bannedUsers = [];
    this.havingRightsUsers = [];

    this.bannedWords = [];

    this.group = group;

    this.isPublicRoom = isPublicRoom;
  }

  static getPopulationLevel(inRoom: number, max: number): RoomPopulation {
    const lowLimit: number = max / 3;
    const mediumLimit: number = lowLimit * 2;

    const playersCount: number = inRoom;

    if (playersCount > 0
               && playersCount <= lowLimit) {

      return RoomPopulation.LOW;
    } else if (playersCount > lowLimit
               && playersCount <= mediumLimit) {

      return RoomPopulation.MEDIUM;
    } else if (playersCount > mediumLimit) {
      return RoomPopulation.HIGH;
    }

    return RoomPopulation.NONE;
  }

  enter(user: User): void {
    if (!this.playersInRoom.includes(user)) {
      this.playersInRoom.push(user);
      this.playersInRoomCount = this.playersInRoom.length;
    }
  };

  leave(user: User): void {
    if (this.playersInRoom.includes(user)) {
      this.playersInRoom = this.playersInRoom.filter(u => u.id !== user.id);
      this.playersInRoomCount = this.playersInRoom.length;
    }
  };
};

type RoomTags = [string?, string?];

export enum RoomPopulation {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum RoomAccessMode {
  OPEN,
  ON_REQUEST,
  PASSWORD,
  WITH_RIGHTS,
  CLOSED_BY_STAFF,
}

export type GridSize = {
  cols: number,
  rows: number,
};