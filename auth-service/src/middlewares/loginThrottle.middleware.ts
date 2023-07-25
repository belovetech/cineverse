import rateLimiter from 'express-rate-limit';

const maxAttempts = 5;
const windowMinutes = 15;

export const loginThrottleMiddleware = rateLimiter({
  windowMs: windowMinutes * 60 * 1000, // 15mins in milliseconds
  max: maxAttempts,
  message: {
    error: 'Too many login attempts from this IP address, please try again later!',
  },
});
