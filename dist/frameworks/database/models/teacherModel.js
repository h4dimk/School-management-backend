"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const teacherSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide a valid name"],
        min: 3,
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email"],
        unique: true,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least six characters"],
    },
    subject: {
        type: String,
        required: [true, "Please provide a valid subject"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    phonenumber: {
        type: Number,
    },
    role: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    dob: {
        type: String || Date,
    },
    batch: {
        type: String,
    },
    batchId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "batch",
    },
}, { timestamps: true });
const teacherModel = mongoose_1.default.model("Teacher", teacherSchema);
exports.default = teacherModel;
//# sourceMappingURL=teacherModel.js.map