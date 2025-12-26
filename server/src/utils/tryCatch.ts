import type { RequestHandler } from "express";

// TryCatch block wrapper for clean code
exports.tryCatch = (controller: RequestHandler): RequestHandler => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        next(error);
    }
}