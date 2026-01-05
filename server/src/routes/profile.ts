import type { Request, Response } from "express";
import type { RouterObject } from "../../types/router.js";

/* GET home page. */
const profileRouter: RouterObject = {
  path: "/profile",
  functions: [
    {
      method: "get",
      props: "/",
      authorization: "required",
      rateLimit: "strict",
      keyType: "default",
      handler: (_req: Request, res: Response) => {
        res.status(200).json({ message: "Works!" });
      },
    },
  ],
};

export default profileRouter;
