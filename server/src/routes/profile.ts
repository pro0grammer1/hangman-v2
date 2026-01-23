import type { Request, Response } from "express";
import type { RouterObject } from "../../types/router.js";
import { supabase } from "../lib/supabaseClient.js";
import { NotFoundError, UnauthorizedError, BadRequestError } from "../errors/httpErrors.js";

/* GET home page. */
const profileRouter: RouterObject = {
  path: "/profile",
  functions: [
    {
      method: "get",
      props: "/",
      authorization: "required",
      rateLimit: "read",
      keyType: "user",
      handler: async (req: Request, res: Response) => {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("username, pfp, status, created_at")
          .eq("id", req.user.id)
          .is("deleted_at", null)
          .single();

        if (error || !profile) {
          throw new NotFoundError(error.message || "User not found");
        }

        const user = {
          id: req.user.id,
          email: req.user.email,
          ...profile,
        };

        res.status(200).json(user);
      },
    },
    {
      method: "patch",
      props: "/",
      authorization: "required",
      rateLimit: "strict",
      keyType: "user",
      handler: async (req: Request, res: Response) => {
        const updates = {
          username: req.body.username,
          pfp: req.body.pfp,
          status: req.body.status,
        };

        if (req.body.username) {
          const usernamePattern = /^[a-zA-Z0-9][a-zA-Z0-9 _-]*[a-zA-Z0-9]$/;
          if (!usernamePattern.test(req.body.username)) {
            throw new BadRequestError("Invalid username format");
          }

          if (req.body.username.length < 4){
            throw new BadRequestError("Username must at least be 3 characters long.");
          }

          if (req.body.username.length > 30){
            throw new BadRequestError("Username must not be more than 30 characters long.");
          }
        }

        Object.keys(updates).forEach(
          (k) =>
            updates[k as keyof typeof updates] === undefined &&
            delete updates[k as keyof typeof updates],
        );

        if (Object.keys(updates).length === 0) {
          throw new UnauthorizedError("No fields to update");
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .update(updates)
          .eq("id", req.user.id)
          .is("deleted_at", null)
          .select("username, pfp, status, created_at")
          .single();

        if (error || !profile) {
          throw new NotFoundError(error?.message || "User not found");
        }

        const user = {
          id: req.user.id,
          email: req.user.email,
          ...profile,
        };

        res.status(200).json(user);
      },
    },
  ],
};

export default profileRouter;
