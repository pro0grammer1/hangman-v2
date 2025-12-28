import express from "express";
var router = express.Router();

export const meRouter: express.Router = router.get(
  "/",
  function (req, res, next) {
    res.send(
      `id: ${req.user.id}\nemail: ${req.user.email}\nrole: ${req.user.role}`,
    );
  },
);
