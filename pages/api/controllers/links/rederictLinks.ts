import { NextApiRequest, NextApiResponse } from "next";
import { searchUrlByShortCode } from "../../models/links";
import { generateError } from "../../utils";
import { logVisit } from "../../models/linkVisists";

class RedirectController {
  public async redirectUrl(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const { shortUrl } = req.query;

    if (typeof shortUrl !== "string") {
      generateError("Url invalida", 400);
    }

    try {
      const originUrl = await searchUrlByShortCode(shortUrl as string);
      console.log("URL encontrada333:", originUrl);

      if (originUrl) {
        const linkId = originUrl.id;
        const visitorIP =
          req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const referrer = req.headers.referer || "";
        const userAgent = req.headers["user-agent"] || "";
        await logVisit(linkId, visitorIP as string, referrer, userAgent);
        res.redirect(originUrl.url);
      
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
