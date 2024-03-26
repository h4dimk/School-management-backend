import Jwt from "../../services/jwt";
import { Next, Req, Res } from "../../types/serverPackageTypes";

const jwt = new Jwt();

async function isAuth(req: Req, res: Res, next: Next) {
  try {
    const token = req.headers.authorization as string;
    if (!token) {
      throw new Error("token not found");
    }

    const decode = await jwt.verifyToken(token);
    req.user = decode;

    // const user = decode;
    // if (user.isActive !== undefined && !user.isActive) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "User is not active",
    //   });
    // }

    next();
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
}

function role(allowRoles: string[]) {
  return async function (req: Req, res: Res, next: Next) {
    try {
      const user = await req.user;
      const userRole = user.role;
      if (!userRole && !allowRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }
      next();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export { isAuth, role };
