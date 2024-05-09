"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = exports.isAuth = void 0;
const jwt_1 = __importDefault(require("../../services/jwt"));
const jwt = new jwt_1.default();
function isAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error("token not found");
            }
            const decode = yield jwt.verifyToken(token);
            req.user = decode;
            // const user = decode;
            // if (user.isActive !== undefined && !user.isActive) {
            //   return res.status(403).json({
            //     success: false,
            //     message: "User is not active",
            //   });
            // }
            next();
        }
        catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    });
}
exports.isAuth = isAuth;
function role(allowRoles) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield req.user;
                const userRole = user.role;
                if (!userRole && !allowRoles.includes(userRole)) {
                    return res.status(403).json({
                        success: false,
                        message: "Unauthorized",
                    });
                }
                next();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    };
}
exports.role = role;
//# sourceMappingURL=auth.js.map