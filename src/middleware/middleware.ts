import { NextFunction, Request, Response } from "express";

export const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  console.log('made it here: errorHadnlingMiddleware');
  res.status(400).send(err.message ? err.message : 'Something broke!');
}

export const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware function executed');
  next(); // Pass control to the next middleware function
} 