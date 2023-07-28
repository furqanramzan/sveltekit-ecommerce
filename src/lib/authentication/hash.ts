import { hash as bcryptHash, compare } from 'bcrypt';

class Hash {
  hash(data: string) {
    return bcryptHash(data, 10);
  }

  compare(data: string, hash: string) {
    return compare(data, hash);
  }
}

export const hash = new Hash();
