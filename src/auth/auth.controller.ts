import { CreateUserDto } from '@/dto/user/create-user.dto';
import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/common/decorator/public.decorator';
import { LoginUserDto } from '@/dto/user/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @Public()
  async login(@Body() { name, password }: LoginUserDto) {
    const user = await this.userService.findOne(name);
    if (user.password === password) {
      const token = this.authService.createToken({
        name,
        password,
      });
      return { token };
    }
    throw new HttpException('该账号未注册', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
