import pool from './database';
import 'dotenv/config';

const useDb = async () => {
  try {
    await pool.query(`USE ${process.env.DB_NAME};`);
  } catch (error) {
    console.error(
      `La base de datos no existe. Ejecuta el npm run initDb para iniciarla`
    );
    process.exit(1);
  }
};

export default useDb;