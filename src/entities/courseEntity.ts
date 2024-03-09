interface ISubject {
  name: string;
}

export interface ICourse {
  course: string;
  subjects: ISubject[];
}
