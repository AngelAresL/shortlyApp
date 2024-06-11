import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../../lib/redis";

const rateLimit = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (err?: any) => void
) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!ip) {
    return res.status(500).json({ error: "No se pudo determinar la IP" });
  }

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  const key = `rate-limit:${ip}:${today}`;
  const requests = await redis.incr(key);

  if (requests === 1) {
    await redis.expire(key, 86400);
  }

  if (requests > 50) {
    return res.status(429).json({
      error: "Límite de solicitudes alcanzado. Intenta de nuevo mañana.",
    });
  }

  next();
};

export default rateLimit;
