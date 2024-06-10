import handler from "./routes/redirectLink";
import { applyMiddlewares } from "./_middlewares";
import { handleError } from "./middlewares/index";
import { NextApiRequest, NextApiResponse } from "next";
import { CustomError } from "./interfaces/CustomError";

const apiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await applyMiddlewares(req, res, async (err) => {
      if (err) return handleError(err as CustomError, req, res);
      await handler(req, res);
    });
  } catch (error) {
    handleError(error as CustomError, req, res);
  }
};
export default apiHandler;