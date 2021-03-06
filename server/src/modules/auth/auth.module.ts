import { EmailModule } from 'src/providers/email/email.module';
import { User, UserSchema } from '@modules/user/schemas/user.schema';
import { UserModule } from '@modules/user/user.module';
import { UserService } from '@modules/user/user.service';
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
		EmailModule,
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		UserModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		PasswordService,
		UserService,
		JwtStrategy,
		JwtRefreshTokenStrategy,
	],
})
export class AuthModule {}
