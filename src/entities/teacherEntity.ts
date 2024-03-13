import Role from "../@types/enum/roles";

export interface ITeacher {
  _id?: string;
  name: string;
  email: string;
  gender:string;
  role:Role;
  password?: string;
  subject: string;
  isActive?: boolean;
  phonenumber?: number;
  avatar?: string;
}
