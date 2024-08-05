"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSession = clearSession;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sessionFolderPath = path_1.default.resolve(__dirname, '..project/backend/.wwebjs_auth/session');
function clearSession() {
    if (fs_1.default.existsSync(sessionFolderPath)) {
        fs_1.default.rmSync(sessionFolderPath, { recursive: true, force: true });
        console.log('Session cleared');
    }
    else {
        console.log('No session folder found');
    }
}
