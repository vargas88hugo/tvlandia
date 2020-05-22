import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return await bcrypt.hash(password, salt);
}
