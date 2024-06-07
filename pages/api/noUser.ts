import { NextApiRequest, NextApiResponse } from 'next';
import urlController from './controllers/links/shortenLink'; // Importa desde controllers
import { applyMiddlewares } from './_middlewares';
import { handleError } from './_errorHandler';
import { CustomError } from './interfaces/CustomError';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    applyMiddlewares(req, res, async (err) => {
      if (err) {
        handleError(err as CustomError, req, res); // handleError requires error handling
        return;
      }

      if (req.method === 'POST') {
        await urlController.shortenUrl(req, res);
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    });
  } catch (error) {
    handleError(error as CustomError, req, res); // Usamos type assertion aquí
  }
};

export default handler;