import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JWT_SECRET } from '@/const';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      // extract token from "Authorization: Bearer xxxx"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Use key to parse token
      secretOrKey: configService.get(JWT_SECRET),
    });
  }
  // Here will be obtained the specific information after token parsing.
  async validate(payload: { name: string; password: string }) {
    const user = await this.authService.verifyUser(payload);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
