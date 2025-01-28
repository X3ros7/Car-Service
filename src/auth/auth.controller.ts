import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/login.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';

@Controller({
  version: '1',
  path: 'auth',
})
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, ...resultWithoutRefresh } = result;
    return resultWithoutRefresh;
  }

  @Post('refresh')
  async refresh(
    @Body() dto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.refreshToken(dto);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, ...resultWithoutRefresh } = result;
    return resultWithoutRefresh;
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(registerDto);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, ...resultWithoutRefresh } = result;
    return resultWithoutRefresh;
  }
}
