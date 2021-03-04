import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class PasswordService {
	public async verify(password: string, hashedPassword: string) {
		return await argon2.verify(hashedPassword, password);
	}

	public async hash(password: string) {
		return await argon2.hash(password);
	}
}
