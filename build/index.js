"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const PORT = process_1.env["PORT"] ? Number(process_1.env["PORT"]) : 3000;
const app = (0, express_1.default)();
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
