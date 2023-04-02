"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
const express_1 = require("express");
const MetadataKeys_1 = require("./MetadataKeys");
exports.router = (0, express_1.Router)();
function controller(rootPath) {
    return function (constructor) {
        const controllerProperties = Object.getOwnPropertyNames(constructor.prototype);
        for (const property of controllerProperties) {
            const method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, constructor.prototype, property);
            const path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, constructor.prototype, property);
            if (path) {
                exports.router[method](`${rootPath}${path}`, constructor.prototype[property]);
            }
        }
    };
}
exports.controller = controller;
