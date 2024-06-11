import pool from '../../db/database';
import { generateError } from '../../utils';

const logVisit = async (linkId: number, visitorIP: string, referrer: string, userAgent: string): Promise<void> => {
  try {
    await pool.execute(
      `INSERT INTO linkVisits (linkId, visitorIP, referrer, userAgent) VALUES (?, ?, ?, ?)`,
      [linkId, visitorIP, referrer, userAgent]
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error registrando la visita:', error.message);
    } else {
      console.error('Error desconocido al registrar la visita.');
    }
    generateError('Fallo durante el proceso de registro de la visita.', 500);
  }
};

export default logVisit;