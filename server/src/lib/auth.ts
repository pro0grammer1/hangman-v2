// Import types
import type { authorization } from "../../types/router.js";
import type { NextFunction, Request } from "express";

// Module imports
import { UnauthorizedError } from "../errors/httpErrors.js";
import verifyJwt from "./verifyJwt.js";

/* An Auth Handler that takes authType
and req parameters to dynamically handle
authentication based on the RouteObject's needs.
*/
export async function authHandler(authType: authorization, req: Request) {
  const request = req.headers.authorization;

  // Required Auth, stop the route strictly if unauthenticated by throwing errors
  if (authType === "required") {
    if (!request?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authentication required");
    }
    try {
      req.user = await verifyJwt(request.slice(7));
    } catch (err) {
      throw new UnauthorizedError("Invalid or expired token");
    }

    // Optional Auth, Try auth but ignore if not present
  } else if (authType === "optional") {
    if (request?.startsWith("Bearer ")) {
      try {
        req.user = await verifyJwt(request.slice(7));
      } catch {
        // ignore invalid token for optional auth
      }
    }

    // No auth
  } else if (authType === "none") {
    return;
  }
}
