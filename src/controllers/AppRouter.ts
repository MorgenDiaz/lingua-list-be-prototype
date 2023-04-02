import { Router } from "express";

export class AppRouter {
  private static appRouter: Router;

  static getInstance(): Router {
    if (!this.appRouter) {
      this.appRouter = Router();
    }

    return this.appRouter;
  }
}
