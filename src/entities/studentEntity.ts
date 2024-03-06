export interface IStudent {
  _id?: string;
  name: string;
  email: string;
  password: string;
  course: string;
  batch: string | number;
  isActive: boolean;
  phonenumber?: number;
  profile?: string;
}
