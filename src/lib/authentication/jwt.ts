import jwtwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

class Jwt {
  private secret: string;

  constructor() {
    this.secret = JWT_SECRET;
  }

  encode(data: object) {
    return jwtwebtoken.sign({ ...data }, this.secret);
  }

  verify(token: string) {
    try {
      jwtwebtoken.verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }

  decode<T>(token: string) {
    return jwtwebtoken.decode(token) as T;
  }

  verifyAndDecode<T>(token: string) {
    const verified = this.verify(token);
    if (verified) {
      return this.decode<T>(token);
    } else {
      return null;
    }
  }
}

export const jwt = new Jwt();
