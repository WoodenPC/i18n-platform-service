import crypto from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(crypto.pbkdf2);

export async function hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    return (await pbkdf2Async(password, salt, 1000, 64, 'sha512')).toString('hex');
}

export async function checkPassword(password: string, hash: string) {
    const hashed = await hashPassword(password);
    return hashed === hash;
}