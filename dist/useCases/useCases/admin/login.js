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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const login = (adminRepository, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the method in the admin repository to find the admin by email
        const admin = yield adminRepository.findByEmail(email);
        // If admin is found and the password matches, return the admin object
        if (admin && admin.password === password) {
            return { admin };
        }
        else {
            // If admin is not found or the password doesn't match, return void
            return;
        }
    }
    catch (error) {
        console.error("Error occurred while logging in admin:", error);
        throw new Error("Failed to log in admin");
    }
});
exports.login = login;
//# sourceMappingURL=login.js.map