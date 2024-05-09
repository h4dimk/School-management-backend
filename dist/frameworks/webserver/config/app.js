"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
const adminRoutes_1 = require("../routes/adminRoutes");
const teacherRoutes_1 = require("../routes/teacherRoutes");
const studentRoutes_1 = require("../routes/studentRoutes");
exports.app.use((0, cors_1.default)({
    origin: process.env.CLIENT,
    credentials: true,
    methods: ["GET", "PATCH", "PUT", "POST", "DELETE"],
    optionsSuccessStatus: 204,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
//routes
exports.app.use("/api/admin", (0, adminRoutes_1.adminRoute)(express_1.default.Router()));
exports.app.use("/api/teacher", (0, teacherRoutes_1.teacherRoute)(express_1.default.Router()));
exports.app.use("/api/student", (0, studentRoutes_1.studentRoute)(express_1.default.Router()));
//unknown url
exports.app.all("*", (req, res, next) => {
    const error = new Error(`route ${req.originalUrl} isn't found`);
    error.statusCode = 404;
    next(error);
});
//# sourceMappingURL=app.js.map