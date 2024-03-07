export interface ITeacher {
  _id?: string;
  name: string;
  email: string;
  gender:string;
  password?: string;
  subject: string;
  isActive?: boolean;
  phonenumber?: number;
  avatar?: string;
}
