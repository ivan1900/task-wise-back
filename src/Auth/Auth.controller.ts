import { Body, Controller, Logger, Post, UsePipes, ValidationPipe, Get, UseGuards, Req } from '@nestjs/common';
import { SignInDto } from './application/dto/Signin.dto';
import { ApiResponse } from 'src/Shared/application/dto/ApiResponse';
import { AuthService } from './application/Auth.service';
import { RefreshService } from './application/Refresh.service';
import { RefreshTokenDto } from './application/dto/RefreshToken.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UsePipes(
  new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }),
)
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly refreshService: RefreshService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req: any) {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    const user = req.user;
    return this.authService.login(user);
  }

  @Post('signin')
  async signIn(
    @Body() body: SignInDto,
  ): Promise<ApiResponse<{ access_token: string; refresh_token: string }>> {
    try {
      const authResult = await this.authService.signIn(body.email, body.password);
      return ApiResponse.success({
        access_token: authResult.access_token,
        refresh_token: authResult.refresh_token,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('SignIn error', error);
      }
      return ApiResponse.error(`Something went wrong server error`);
    }
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<ApiResponse<{ access_token: string; refresh_token: string }>> {
    try {
      const authResult = await this.refreshService.refreshToken(body.refresh_token);
      return ApiResponse.success({
        access_token: authResult.access_token,
        refresh_token: authResult.refresh_token,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Refresh token error', error);
      }
      return ApiResponse.error(`Something went wrong server error`);
    }
  }
}
