import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { UserFinder } from 'src/User/application/UserFinder.service';
import AuthRepository from '../infraestructure/Auth.repository';
import GenerateJWT from '../domain/GenerateJTW.service';
import Session from '../domain/session';

describe('AuthService', () => {
  let service: AuthService;
  let userFinder: UserFinder;
  let repository: AuthRepository;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserFinder,
          useValue: {
            byEmail: jest.fn(),
          },
        },
        {
          provide: AuthRepository,
          useValue: {
            findSessionByUserId: jest.fn(),
            removeSessionsByUserId: jest.fn(),
            saveSession: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userFinder = module.get<UserFinder>(UserFinder);
    repository = module.get<AuthRepository>(AuthRepository);

    jest.spyOn(GenerateJWT, 'accessToken').mockReturnValue('mockAccessToken');
    jest.spyOn(GenerateJWT, 'refreshToken').mockReturnValue('mockRefreshToken');
    jest.spyOn(Session, 'fromPrimitives').mockReturnValue({
      id: null,
      userId: mockUser.id,
      refreshToken: 'mockRefreshToken',
      valid: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should sign in a user with valid credentials', async () => {
    jest.spyOn(userFinder, 'byEmail').mockResolvedValue(mockUser);
    jest.spyOn(repository, 'findSessionByUserId').mockResolvedValue(null);
    jest.spyOn(repository, 'saveSession').mockResolvedValue(undefined);

    const result = await service.signIn('test@example.com', 'password123');

    expect(userFinder.byEmail).toHaveBeenCalledWith('test@example.com');
    expect(repository.findSessionByUserId).toHaveBeenCalledWith(mockUser.id);
    expect(repository.saveSession).toHaveBeenCalled();
    expect(result).toEqual({
      access_token: 'mockAccessToken',
      refresh_token: 'mockRefreshToken',
    });
  });

  it('should throw UnauthorizedException for invalid credentials', async () => {
    jest.spyOn(userFinder, 'byEmail').mockResolvedValue(mockUser);

    await expect(service.signIn('test@example.com', 'wrongPassword')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should remove existing sessions before creating a new one', async () => {
    jest.spyOn(userFinder, 'byEmail').mockResolvedValue(mockUser);
    jest.spyOn(repository, 'findSessionByUserId').mockResolvedValue({ id: 1 } as any);
    jest.spyOn(repository, 'removeSessionsByUserId').mockResolvedValue(undefined);
    jest.spyOn(repository, 'saveSession').mockResolvedValue(undefined);

    const result = await service.signIn('test@example.com', 'password123');

    expect(repository.removeSessionsByUserId).toHaveBeenCalledWith(mockUser.id);
    expect(repository.saveSession).toHaveBeenCalled();
    expect(result).toEqual({
      access_token: 'mockAccessToken',
      refresh_token: 'mockRefreshToken',
    });
  });

  it('should handle repository errors gracefully', async () => {
    jest.spyOn(userFinder, 'byEmail').mockResolvedValue(mockUser);
    jest.spyOn(repository, 'findSessionByUserId').mockResolvedValue(null);
    jest.spyOn(repository, 'saveSession').mockRejectedValue(new Error('Database error'));

    await expect(service.signIn('test@example.com', 'password123')).rejects.toThrow(
      'Database error',
    );
  });
});
