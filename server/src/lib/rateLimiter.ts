import rateLimit from "express-rate-limit";

type keyType = "ip" | "user" | "default";

class RateLimiter {
  private limits = {
    strict: { windowMs: 60_000, max: 10 },
    gameplay: { windowMs: 60_000, max: 60 },
    read: { windowMs: 60_000, max: 300 },
  } as const;

  limit(policy: keyof typeof this.limits, keyType: keyType) {
    return rateLimit({
      ...this.limits[policy],
      keyGenerator: (req) => {
        if (keyType === "user") return req.user!.id;
        if (keyType === "ip") return req.ip!;
        return req.user?.id ?? req.ip!;
      },
    });
  }
}

export const rateLimiter = new RateLimiter();
