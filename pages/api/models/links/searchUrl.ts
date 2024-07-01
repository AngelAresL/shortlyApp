import { PrismaClient } from "@prisma/client";
import { LinkData } from "../../interfaces/LinkData";
import { generateError } from "../../utils";

const prisma = new PrismaClient();

const searchUrl = async ({ url }: LinkData): Promise<boolean | undefined> => {
  try {
    const link = await prisma.link.findFirst({
      where: { url },
      select: { id: true },
    });

    return link !== null;
  } catch (error) {
    console.error("Error desconocido al buscar URL.");

    generateError("Fallo durante el proceso de búsqueda.", 500);
  }
};

export default searchUrl;
