import Role from "./enum/roles";

export interface IUserData {
  _id: string;
  role: Role;
  // isActive?:boolean,
}
