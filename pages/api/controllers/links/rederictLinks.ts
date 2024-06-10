import { NextApiRequest, NextApiResponse } from "next";
import { searchUrlByShortCode } from "../../models/links";
import { generateError } from "../../utils";

class RedirectController {
  public async redirectUrl(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const { shortUrl } = req.query;

    if (typeof shortUrl !== "string") {
      generateError("Invalid URL", 400);
    }

    try {
      const originalUrl = await searchUrlByShortCode(shortUrl as string);

      if (originalUrl) {
        res.redirect(originalUrl);
      } else {
        generateError("URL not found", 404);
      }
    } catch (error) {
      generateError("Internal Server Error", 500);
    }
  }
}

const redirectController = new RedirectController();
export default redirectController;
