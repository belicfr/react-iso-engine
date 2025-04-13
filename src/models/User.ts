export class SessionRepository {
  static instance: SessionRepository;

  user: User;

  constructor(user: User) {
    this.user = user;
  }

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
        canUseStaffEffect: true
      }),
      new User(2, "Player", {
        isStaff: false,
        canBeInvisible:false,
        canUseModTools: false,
        canUseStaffEffect: false
      }),
      new User(3, "jonax", {
        isStaff: true,
        canBeInvisible:true,
        canUseModTools: true,
        canUseStaffEffect: true
      }),
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

  friends: User[];

  // Permissions (refactor w/ backend impl)
  permissions: UserPermissions;

  constructor(id: number, name: string, permissions: UserPermissions) {
    this.id = id;
    this.name = name;

    this.friends = [];

    this.permissions = permissions;
  }
};

export type UserPermissions = {
  // Staff Permissions
  isStaff: boolean,
  canUseModTools: boolean,
  canBeInvisible: boolean,
  canUseStaffEffect: boolean,
};