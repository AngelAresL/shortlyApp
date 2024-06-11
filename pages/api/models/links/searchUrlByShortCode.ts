import { RowDataPacket, FieldPacket } from "mysql2";
import pool from "../../db/database";
import { generateError } from "../../utils/index";

const searchUrlByShortCode = async (
  shortUrl: string
): Promise<{ id: number; url: string } | undefined> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.execute(
      "SELECT id,url FROM links WHERE shortUrl = ?",
      [shortUrl]
    );

    if (rows.length > 0) {
      const { id, url } = rows[0] as { id: number; url: string };
      return { id, url };
    } else {
      return undefined;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error buscando URL por shortUrl:", error.message);
    } else {
      console.error("Error desconocido al buscar URL por shortUrl.");
    }
    generateError("Fallo durante el proceso de búsqueda.", 500);
  }
};

export default searchUrlByShortCode;
