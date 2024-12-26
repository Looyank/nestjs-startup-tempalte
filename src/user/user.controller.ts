import { Controller, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '@/common/decorator/public.decorator';
import {
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户管理')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':name')
  @ApiOperation({
    summary: '根据用户名查询用户',
    description: '通过用户名获取用户信息',
  })
  @ApiParam({ name: 'name', description: '用户名' })
  findOne(@Param('name') name: string) {
    return this.userService.findOne(name);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: '获取所有用户',
    description: '获取系统中所有用户的列表',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户', description: '通过用户ID删除指定用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
