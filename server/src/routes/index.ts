import express from "express";
import type { Request, Response } from "express";
import type { RouterObject } from "../../types/router.js";

/* GET home page. */
const indexRouter: RouterObject = {
  path: "/",
  functions: [
    {
      method: "get",
      authorization: "required",
      rateLimit: "strict",
      handler: (req: Request, res: Response) => {
        res.status(200).json({ message: "Works!" });
      },
    },
  ],
};

export default indexRouter;
