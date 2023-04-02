import { Router } from "express";
import { AppRouter } from "../AppRouter";
import { HttpMethods } from "./HttpMethods";
import { MetadataKeys } from "./MetadataKeys";

export function controller(rootPath: string) {
  return function (constructor: Function) {
    const router = AppRouter.getInstance();

    const controllerProperties = Object.getOwnPropertyNames(
      constructor.prototype
    );

    for (const property of controllerProperties) {
      const method: HttpMethods = Reflect.getMetadata(
        MetadataKeys.method,
        constructor.prototype,
        property
      );

      const path: string = Reflect.getMetadata(
        MetadataKeys.path,
        constructor.prototype,
        property
      );

      if (path) {
        router[method](`${rootPath}${path}`, constructor.prototype[property]);
      }
    }
  };
}
