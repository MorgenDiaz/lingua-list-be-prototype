"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
require("reflect-metadata");
const HttpMethods_1 = require("./HttpMethods");
const MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
        };
    };
}
exports.get = routeBinder(HttpMethods_1.HttpMethods.get);
