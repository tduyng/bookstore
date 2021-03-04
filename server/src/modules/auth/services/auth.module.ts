import { EmailModule } from '@modules/email/email.module';
import { Avatar, AvatarSchema } from '@modules/user/avatar.schema';
import { User, UserSchema } from '@modules/user/user.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';

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
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Avatar.name, schema: AvatarSchema },
		]),
	],
	controllers: [],
	providers: [AuthService, PasswordService],
})
export class AuthModule {}
