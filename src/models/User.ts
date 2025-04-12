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
        new User(3, "jonax", {
          isStaff: true,
          canBeInvisible:true,
          canUseModTools: true,
          canUseStaffEffect: true
        })
      );
    }

    return SessionRepository.instance;
  };
}

export class UserRepository {
  static instance: UserRepository;

  users: User[];

  constructor() {
    this.users = [];
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

  // Permissions (refactor w/ backend impl)
  permissions: UserPermissions;

  constructor(id: number, name: string, permissions: UserPermissions) {
    this.id = id;
    this.name = name;
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