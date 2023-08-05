import { Body, Controller, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}
    //localhost:3000/auth/signup

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto) : Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto): Promise<{accessToken:string}>{
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User) {
    
    }
}