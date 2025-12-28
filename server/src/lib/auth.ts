import type { authorization } from "../../types/router.js";
import type { Request } from "express";
import { UnauthorizedError } from "../errors/httpErrors.js";
import verifyJwt from "./verifyJwt.js";

export async function authHandler(authType: authorization, req: Request) {
  const request = req.headers.authorization;
  if (authType === "required") {
    if (!request?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authentication required");
    }
    try {
      req.user = await verifyJwt(request.slice(7));
    } catch (err) {
      throw new UnauthorizedError("Invalid or expired token");
    }
  } else if (authType === "optional") {
    if (request?.startsWith("Bearer ")) {
      try {
        req.user = await verifyJwt(request.slice(7));
      } catch {
        // ignore invalid token for optional auth
      }
    }
  } else if (authType === "none") {
    return;
  }
}
