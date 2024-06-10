import { RowDataPacket, FieldPacket } from 'mysql2';
import pool from '../../db/database';

const searchUrlByShortCode = async (shortUrl: string): Promise<string | null> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.execute(
      'SELECT url FROM links WHERE shortUrl = ?',
      [shortUrl]
    );

    if (rows.length > 0) {
      return rows[0].url;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error buscando la URL corta:', error);
    throw new Error('Error interno del servidor');
  }
};

export default searchUrlByShortCode;