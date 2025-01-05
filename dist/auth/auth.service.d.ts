import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    signup(username: string, password: string): Promise<{
        message: string;
    }>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
