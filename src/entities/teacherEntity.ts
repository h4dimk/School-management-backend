export interface ITeacher {
  _id?: string;
  name: string;
  email: string;
  password: string;
  subject: string;
  isActive: boolean;
  phonenumber?: number;
  profile?: string;
}
