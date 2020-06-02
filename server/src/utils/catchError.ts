import { Request, Response, NextFunction, RequestHandler } from 'express';

interface Par {
   [key: string]: string;
}

export default <Some extends Par>(fun: RequestHandler<Some>) => {
   return async (req: Request<Some>, res: Response, next: NextFunction): Promise<void> => {
      try {
         await fun(req, res, next);
      } catch (err) {
         next(err);
      }
   };
};
