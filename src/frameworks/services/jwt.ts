import jwt, { Secret } from "jsonwebtoken";
import { IUserData } from "../../@types/jwtUserData";
import IJwtService from "../../useCases/interface/services/jwtService";


class Jwt implements IJwtService{
  constructor() {}

  public async createToken(data: IUserData): Promise<string> {
    try {
      return jwt.sign(data, process.env.JWT_SECRET as Secret, {
        expiresIn: "7d",
      });
    } catch (error) {
      throw error;
    }
  }

  public async verifyToken(token: string): Promise<IUserData> {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET as Secret) as IUserData;
      return decode
    } catch (error) {
      throw error;
    }
  }
}

export default Jwt;
