import { Controller, Get, UseGuards, Body, Post, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ILogin } from './interfaces/Login.interface';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async createToken(@Body() payload: ILogin): Promise<any> {
    return await this.authService.loginUser(payload);
  }

}