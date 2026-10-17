import { createHash, randomBytes } from 'node:crypto';
export function newsletterToken() { return randomBytes(32).toString('hex'); }
export function tokenHash(token: string) { return createHash('sha256').update(token).digest('hex'); }
export function validToken(token: unknown): token is string { return typeof token === 'string' && /^[a-f0-9]{64}$/.test(token); }
