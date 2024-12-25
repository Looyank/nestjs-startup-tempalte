import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(payload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  verifyToken(token) {
    if (!token) return '';

    return this.jwtService.verify(token);
  }
}
