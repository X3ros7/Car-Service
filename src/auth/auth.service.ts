import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RefreshTokenDto } from './dto/login.dto';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      this.logger.error(`User with email ${loginDto.email} not found`);
      throw new UnauthorizedException(`User not found`);
    }
    if (user.password !== loginDto.password) {
      this.logger.error(
        `Invalid password for user with email ${loginDto.email}`,
      );
      throw new UnauthorizedException(`Invalid password`);
    }
    const tokens = await this.generateTokens(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;

    this.logger.log(`User with email ${loginDto.email} logged in`);
    return await this.getAuthResult(user, tokens);
  }

  async refreshToken(dto: RefreshTokenDto) {
    const decoded = this.jwtService.decode(dto.refreshToken);
    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    const id = decoded.sub;
    const exp = decoded.exp;

    if (!id || !exp) {
      throw new UnauthorizedException('Invalid token');
    }

    const expDate = DateTime.fromSeconds(exp);
    if (expDate < DateTime.now()) {
      throw new UnauthorizedException('Token expired');
    }

    const user = await this.userService.findById(id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = await this.generateTokens(user);
    return await this.getAuthResult(user, tokens);
  }

  private async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });

    return { token, refreshToken };
  }

  private async getAuthResult(
    user: User,
    tokens: { token: string; refreshToken: string },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;
    return {
      token: tokens.token,
      refreshToken: tokens.refreshToken,
      user: userData,
    };
  }
}
