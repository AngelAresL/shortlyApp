import { NextApiRequest, NextApiResponse } from 'next';
import { CustomError } from '../interfaces/CustomError';

const handleError = (error: CustomError, req: NextApiRequest, res: NextApiResponse) => {
  console.error(error);

  res.status(error.httpStatus || 500).json({
    error: error.message || 'An unexpected error occurred',
  });
};

export default handleError;