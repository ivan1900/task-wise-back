import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './Auth.controller';
import { AuthService } from './application/Auth.service';
import { RefreshService } from './application/Refresh.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  const mockRefreshService = {
    refreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: RefreshService,
          useValue: mockRefreshService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
