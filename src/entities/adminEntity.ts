import Role from "../@types/enum/roles";

export interface IAdmin {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  role?:Role
  phonenumber?: number;
  avatar?: string;
  gender?:string;
  dob?: string | Date;
}
