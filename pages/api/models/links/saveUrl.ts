import { ResultSetHeader } from 'mysql2';
import pool from '../../db/database';
import { LinkData } from '../../interfaces/LinkData';
import { generateError } from '../../utils/index';

const saveUrl = async ({ url, shortUrl }: LinkData) => {
  try {
    const [{ insertId }] = await pool.execute<ResultSetHeader>(
      `
            INSERT INTO links (url, shortUrl, clicks, lastClick) VALUES (?, ?, 0, NULL)
          `,
      [url, shortUrl]
    );

    return insertId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error guardando url:', error.message);
    } else {
      console.error('Error desconocido al guardar url.');
    }
    generateError('Fallo durante el proceso de guardado.', 500);
  }
};

export default saveUrl;