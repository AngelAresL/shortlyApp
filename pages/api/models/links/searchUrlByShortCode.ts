import { PrismaClient } from "@prisma/client";
import { generateError } from "../../utils";

const prisma = new PrismaClient();

const searchUrlByShortCode = async (
  shortUrl: string
): Promise<{ id: number; url: string } | undefined> => {
  try {
    const link = await prisma.link.findUnique({
      where: { shortUrl },
      select: { id: true, url: true },
    });

    if (link) {
      return { id: link.id, url: link.url };
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error buscando URL:", error);
    generateError("Fallo durante el proceso de búsqueda.", 500);
  }
};
export default searchUrlByShortCode;
