import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/JwtPayload';
import { UserService } from '../users/user.service';
import { ILogin } from './interfaces/Login.interface';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async loginUser(payload: ILogin) {
    let user = await this.userService.getUserByEmail(payload.email)
    const passwordIsValid = bcrypt.compareSync(payload.password, user.password)
    if (passwordIsValid) {
      const jwtPayload: JwtPayload = {
        name: user.first_name + ' ' + user.last_name,
        id: user.email,
        publishers: user.publisher_id,
        role: user.role
      }
      const currentDateTime = new Date().toLocaleString().slice(0,19).replace('T', ' ')
      const accessToken = this.jwtService.sign(jwtPayload, { expiresIn: 864000 });
      user.token = accessToken
      user.last_login = currentDateTime
      await this.userService.updateUser(user)
      if (accessToken != '') {
        return { token: accessToken }
      }
    } else {
      return new UnauthorizedException('Unauthorized', 'None shall pass!')
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.getUserByEmail(payload.id)
    if (!user) {
        return new UnauthorizedException('Unauthorized')
    }

    return user
  }
}