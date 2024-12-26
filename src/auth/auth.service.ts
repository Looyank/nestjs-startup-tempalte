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

  async verifyUser({ name }: { name: string; password: string }) {
    const user = await this.userService.findOne(name);
    return user;
  }
}
