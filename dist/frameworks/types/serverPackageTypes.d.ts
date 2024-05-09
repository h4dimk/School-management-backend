/// <reference types="cookie-parser" />
import { Router, Request, Response, NextFunction, Express } from "express";
interface customReq extends Request {
    user?: any;
}
export type Req = customReq;
export type Res = Response;
export type Next = NextFunction;
export type serverPackage = Express;
export type Route = Router;
export {};
