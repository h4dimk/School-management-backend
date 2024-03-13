
export interface ITeacherUseCase {
    login(email:string,password:string):Promise<string>;
}
