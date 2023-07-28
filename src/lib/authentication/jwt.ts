import jwtwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export interface JwtData {
  id: number;
  name: string;
  email: string;
}

class Jwt {
  private secret: string;

  constructor() {
    this.secret = JWT_SECRET;
  }

  encode(data: JwtData) {
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

  decode(token: string) {
    return jwtwebtoken.decode(token) as JwtData;
  }

  verifyAndDecode(token: string) {
    const verified = this.verify(token);
    if (verified) {
      return this.decode(token);
    } else {
      return null;
    }
  }
}

export const jwt = new Jwt();
