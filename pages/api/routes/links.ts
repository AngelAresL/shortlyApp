import { NextApiRequest, NextApiResponse } from 'next';
import UrlController from '../controllers/links/shortenLink';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await UrlController.shortenUrl(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;