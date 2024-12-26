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
import { CreateUserDto } from '@/dto/user/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @Public()
  async login(@Body() { name, password }: CreateUserDto) {
    const user = await this.userService.findOne(name);
    if (!user) {
      throw new HttpException('该账号未注册', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await this.authService.createToken({
        name,
        password,
      });
      return { token };
    }
    throw new HttpException('用户名或密码错误', HttpStatus.UNAUTHORIZED);
  }

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    const existUser = await this.userService.findOne(createUserDto.name);
    if (existUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      name: newUser.name,
    };
  }

  @Post('change-password')
  async changePassword(
    @Body() body: { name: string; oldPassword: string; newPassword: string },
  ) {
    const user = await this.userService.findOne(body.name);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const isPasswordValid = await bcrypt.compare(
      body.oldPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('原密码错误', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);
    await this.userService.updatePassword(body.name, hashedPassword);

    return {
      message: '密码修改成功',
    };
  }
}
