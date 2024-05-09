import { IUserData } from "../../../@types/jwtUserData";
interface IJwtService {
    createToken(data: IUserData): Promise<string>;
    verifyToken(token: string): Promise<IUserData>;
}
export default IJwtService;
