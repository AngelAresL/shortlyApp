import { RowDataPacket, FieldPacket } from 'mysql2';
import pool from '../../db/database';
import { LinkData } from '../../interfaces/LinkData';
import { generateError } from '../../utils/index';

const searchUrl = async ({ url }: LinkData): Promise<boolean | undefined> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.execute(
      `
            SELECT id FROM links WHERE url=?
          `,
      [url]
    );

    return rows.length > 0;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error buscando URL:', error.message);
    } else {
      console.error('Error desconocido al buscar URL.');
    }
    generateError('Fallo durante el proceso de búsqueda.', 500);
  }
};

export default searchUrl;