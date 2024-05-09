import { Next, Req, Res } from "../../types/serverPackageTypes";
declare function isAuth(req: Req, res: Res, next: Next): Promise<void>;
declare function role(allowRoles: string[]): (req: Req, res: Res, next: Next) => Promise<Res | undefined>;
export { isAuth, role };
