import { PrismaClient } from "@prisma/client";
import { generateError } from "../../utils/index";

const prisma = new PrismaClient();

const logVisit = async (
  linkId: number,
  visitorIP: string,
  referrer: string,
  userAgent: string
) => {
  try {
    await prisma.linkVisit.create({
      data: {
        linkId,
        visitorIP,
        referrer,
        userAgent,
      },
    });
  } catch (error) {
    console.error("Error registrando la visita:", error);
    generateError("Fallo durante el proceso de registro de la visita.", 500);
  }
};
export default logVisit;

