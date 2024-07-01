import { PrismaClient } from '@prisma/client';
import {generateError} from '../../utils/index';

const prisma = new PrismaClient();

const saveUrl = async ({ url, shortUrl }: { url: string, shortUrl: string }) => {
  try {
    const link = await prisma.link.create({
      data: {
        url,
        shortUrl,
      },
    });
    return link.id;
  } catch (error) {
    console.error('Error guardando URL:', error);
    generateError('Fallo durante el proceso de guardado.', 500);
  }
};
export default saveUrl;
