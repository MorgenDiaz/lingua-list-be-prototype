"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
class AppRouter {
    static getInstance() {
        if (!this.appRouter) {
            this.appRouter = (0, express_1.Router)();
        }
        return this.appRouter;
    }
}
exports.AppRouter = AppRouter;
