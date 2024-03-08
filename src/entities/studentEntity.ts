export interface IStudent {
  _id?: string;
  name: string;
  email: string;
  password: string;
  course: string;
  batch: string | number;
  gender:string;
  isActive?: boolean;
  phonenumber?: number;
  avatar?: string;
}
