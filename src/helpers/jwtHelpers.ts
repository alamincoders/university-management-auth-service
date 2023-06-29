import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expire_time: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expire_time,
  });
};

export const jwtHelpers = {
  createToken,
};
