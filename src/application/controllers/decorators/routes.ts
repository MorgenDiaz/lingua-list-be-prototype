import { RequestHandler } from "express";
import "reflect-metadata";
import { HttpMethods } from "./HttpMethods";
import { MetadataKeys } from "./MetadataKeys";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: HttpMethods) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
    };
  };
}

export const get = routeBinder(HttpMethods.get);
