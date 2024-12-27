import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 15, {
    message: 'The password length must be between 8-15 characters.',
  })
  password: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsEmail({}, { message: 'email format is incorrect' })
  email?: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    default: 0,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  sex?: number | null;
}
