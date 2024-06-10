import { NextApiRequest, NextApiResponse } from "next";
import { redirectController } from "../controllers/links/index";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await redirectController.redirectUrl(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
