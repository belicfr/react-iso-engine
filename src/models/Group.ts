import User, {UserRepository} from "./User.ts";

export class GroupRepository {
  static instance: GroupRepository;

  groups: Group[];

  constructor() {
    this.groups = [
      new Group(
        1,
        "Best Group",
        "Join us!",
        UserRepository.i().findById(1)!,
        [UserRepository.i().findById(1)!],
        1,
        GroupMode.OPEN,
        new Date()),
    ];
  }

  findById(id: number): Group|null {
    return this.groups.find(group => group.id === id)
      ?? null;
  }


  static i() {
    if (!GroupRepository.instance) {
      GroupRepository.instance = new GroupRepository();
    }

    return GroupRepository.instance;
  };
}

export default class Group {
  id: number;
  name: string;
  description: string;
  owner: User;

  members: User[];
  membersCount: number;

  mode: GroupMode;

  createdAt: Date;

  constructor(
    id: number,
    name: string,
    description: string,
    owner: User,
    members: User[],
    membersCount: number,
    mode: GroupMode,
    createdAt: Date) {

    this.id = id;
    this.name = name;
    this.description = description;
    this.owner = owner;
    this.members = members;
    this.membersCount = membersCount;
    this.mode = mode;
    this.createdAt = createdAt;
  }
};

export enum GroupMode {
  OPEN,
  ON_REQUEST,
  CLOSED,
  CLOSED_BY_STAFF,
}