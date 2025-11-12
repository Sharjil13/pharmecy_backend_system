import { Request, Response, NextFunction, RequestHandler } from 'express';

const PromiseHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default PromiseHandler;
