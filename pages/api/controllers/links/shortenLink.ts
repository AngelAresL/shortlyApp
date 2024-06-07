import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { saveUrl, searchUrl } from '../../models/links';
import { generateError } from '../../utils';

class UrlController {
  public async shortenUrl(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const { url } = req.body;
    const shortUrl = nanoid(6);

    try {
      const existingUrl = await searchUrl({ url });
      if (existingUrl) {
        generateError('La URL ya ha sido acortada.', 500);
      }

      const insertId = await saveUrl({ url, shortUrl });

      res.status(201).json({
        message: 'Se ha acortado el link correctamente.',
        data: {
          originalUrl: url,
          shortUrl: `http://localhost:3000/${shortUrl}`,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error.' });
    }
  }
}

const urlController = new UrlController();
export default urlController;