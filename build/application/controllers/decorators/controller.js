"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const AppRouter_1 = require("../../AppRouter");
const MetadataKeys_1 = require("./MetadataKeys");
function controller(rootPath) {
    return function (constructor) {
        const router = AppRouter_1.AppRouter.getInstance();
        const controllerProperties = Object.getOwnPropertyNames(constructor.prototype);
        for (const property of controllerProperties) {
            const method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, constructor.prototype, property);
            const path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, constructor.prototype, property);
            if (path) {
                router[method](`${rootPath}${path}`, constructor.prototype[property]);
            }
        }
    };
}
exports.controller = controller;
