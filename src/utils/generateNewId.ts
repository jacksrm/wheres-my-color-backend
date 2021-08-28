import crypto from 'crypto';

export default function generateNewId(): string {
  return crypto.randomBytes(20).toString('hex');
}
