import { IUserData } from "../../@types/jwtUserData";
import IJwtService from "../../useCases/interface/services/jwtService";
declare class Jwt implements IJwtService {
    constructor();
    createToken(data: IUserData): Promise<string>;
    verifyToken(token: string): Promise<IUserData>;
}
export default Jwt;
