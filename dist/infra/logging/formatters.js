"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUppercaseLevel = void 0;
/* eslint-disable no-param-reassign */
const winston_1 = __importDefault(require("winston"));
exports.formatUppercaseLevel = winston_1.default.format((info) => {
    info.level = info.level.toUpperCase();
    return info;
});
//# sourceMappingURL=formatters.js.map