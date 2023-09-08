import { User } from "../../domain/user.domain";

export const USER_REPOSITORY = "USER_REPOSITORY";

export interface UserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  update(currentUser: User, newUser: User): Promise<User>;
  delete(id: number): Promise<void>;
}
