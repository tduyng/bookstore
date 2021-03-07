import { EmailModule } from 'src/providers/email/email.module';
import { User, UserSchema } from '@modules/user/user.schema';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule.register({
			defaultStrategy: 'jwt',
			session: true,
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
		}),
		UserModule,
		EmailModule,
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [AuthController],
	providers: [AuthService, PasswordService, JwtStrategy, JwtRefreshTokenStrategy],
	exports: [AuthService, PasswordService, JwtModule],
})
export class AuthModule {}
