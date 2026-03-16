import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get Request
        const request = context.switchToHttp().getRequest<Request>();
        // Extract Token from header
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            // Make sure if this token Correct
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });

            // Link user Info with request
            request['user'] = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    // Extract Token(read header and extract Authorization: Bearer <token>)
    private extractToken(request: Request): string | null {
        const authHeader = request.headers.authorization;
        if (!authHeader) return null;

        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : null;
    }
}

/*
    -> Verify token already exist
    -> Add user info to req
    -> stop if token to match
*/