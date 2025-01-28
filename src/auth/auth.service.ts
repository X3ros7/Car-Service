import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RefreshTokenDto } from './dto/login.dto';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';
import { RegisterDto } from './dto/register.dto';
import { compare } from 'bcrypt';
import { IAuthResult } from './interfaces/auth.interface';

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
    if (!(await compare(loginDto.password, user.password))) {
      this.logger.error(
        `Invalid password for user with email ${loginDto.email}`,
      );
      throw new UnauthorizedException(`Invalid password`);
    }
    const tokens = await this.generateTokens(user);

    this.logger.log(`User with email ${loginDto.email} logged in`);
    return await this.getAuthResult(user, tokens);
  }

  async register(dto: RegisterDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      this.logger.error(`User with email ${dto.email} already exists`);
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.userService.create(dto);
    const tokens = await this.generateTokens(newUser);

    this.logger.log(
      `User with email ${newUser.email} was successfully registered to app`,
    );
    return await this.getAuthResult(newUser, tokens);
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
      this.logger.error(`User with id ${id} not found`);
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
  ): Promise<IAuthResult> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;
    return {
      token: tokens.token,
      refreshToken: tokens.refreshToken,
      user: userData,
    };
  }
}
