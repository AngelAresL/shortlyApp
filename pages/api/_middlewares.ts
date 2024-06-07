import morgan from 'morgan';
import { NextApiRequest, NextApiResponse } from 'next';

export const applyMiddlewares = (req: NextApiRequest, res: NextApiResponse, next: (err?: Error) => void) => {
  morgan('dev')(req as any, res as any, next);
};