import User from "./User.ts";

export default class Room {
  id: number;
  name: string;
  owner: User;
  tags: RoomTags;

  constructor(id: number, name: string, owner: User, tags: RoomTags) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.tags = tags;
  }
};

type RoomTags = [string?, string?];