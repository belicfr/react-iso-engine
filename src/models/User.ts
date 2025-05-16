import Room from "./Room.ts";
import {Coord2D} from "../game/room-view/engine/precepts/Coord2D.ts";
import AvatarEffect, {EAvatarEffect} from "../game/room-view/entities/AvatarEffect.ts";
import Alert from "./Alert.ts";
import Rank, {RankRepository} from "./Rank.ts";

export class SessionRepository {
  static instance: SessionRepository;

  user: User;
  alerts: Alert[];

  constructor(user: User) {
    this.user = user;
    this.alerts = [];
  }

  closeAlert(id: number) {
    this.alerts = this.alerts.filter(alert => alert.id !== id);
  };


  static i(): SessionRepository {
    if (!SessionRepository.instance) {
      SessionRepository.instance = new SessionRepository(
        // STUB
        UserRepository.i().findById(3)!
      );
    }

    return SessionRepository.instance;
  };
}

export class UserRepository {
  static instance: UserRepository;

  users: User[];

  constructor() {
    this.users = [
      new User(1, "Staff", {
        isStaff: true,
        canBeInvisible:true,
        canUseModTools: true,
        canUseStaffEffect: true,
      }, RankRepository.i().findById(2)!),
      new User(2, "Player", {
        isStaff: false,
        canBeInvisible:false,
        canUseModTools: false,
        canUseStaffEffect: false,
      }, RankRepository.i().findById(1)!),
      new User(3, "jonax", {
        isStaff: true,
        canBeInvisible:true,
        canUseModTools: true,
        canUseStaffEffect: true,
      }, RankRepository.i().findById(2)!),
    ];
  }

  findById(id: number): User|null {
    return this.users.find(user => user.id === id)
      ?? null;
  }


  static i(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }

    return UserRepository.instance;
  };
}

export default class User {
  id: number;
  name: string;
  home: Room|null;
  friends: User[];
  currentPosition: Coord2D;
  currentRoom: Room|null;
  roomsHistory: Room[];
  avatarEffect: AvatarEffect;

  // Permissions (refactor w/ backend impl)
  permissions: UserPermissions;

  invisible: boolean;

  ip?: string;

  rank: Rank;

  constructor(
    id: number,
    name: string,
    permissions: UserPermissions,
    rank: Rank) {

    this.id = id;
    this.name = name;
    this.home = null;
    this.friends = [];
    this.currentPosition = {x: 0, y: 0};
    this.currentRoom = null;
    this.roomsHistory = [];
    this.avatarEffect = AvatarEffect.findByCode(EAvatarEffect.NONE);

    this.permissions = permissions;

    this.invisible = false;

    this.ip = "127.0.0.1"; // STUB

    this.rank = rank;
  };

  isInvisible(): boolean {
    return this.permissions.canBeInvisible
      && this.invisible;
  };

  isUsingStaffEffect(): boolean {
    return this.avatarEffect.code === EAvatarEffect.STAFF;
  }
};

export type UserPermissions = {
  // Staff Permissions
  isStaff: boolean,
  canUseModTools: boolean,
  canBeInvisible: boolean,
  canUseStaffEffect: boolean,
};