import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EnvConfig, envConfig } from 'src/common/config/env.config';

@Injectable()
export class EmailService {
	private _env: EnvConfig;
	constructor(private mailer: MailerService) {
		this._env = envConfig();
	}

	public async sendWelcome(toEmail: string): Promise<void> {
		await this.mailer.sendMail({
			template: 'welcome',
			from: this._env.email.emailSender,
			to: toEmail,
			subject: '🥳🎉 Welcome to the Bookstore',
			context: {
				siteUrl: this._env.clientUrl,
			},
		});
	}

	public async sendResetPassword(toEmail: string, token: string): Promise<void> {
		const tokenUrl = `${this._env.serverUrl}/reset-password/${token}`;
		await this.mailer.sendMail({
			template: 'reset-password',
			from: this._env.email.emailSender,
			to: toEmail,
			subject: '🔑 Request to recover your password',
			context: {
				tokenUrl,
			},
		});
	}

	public async sendEmailConfirmation(toEmail: string, token: string): Promise<void> {
		const tokenUrl = `${this._env.serverUrl}/activate/${token}`;
		await this.mailer.sendMail({
			template: 'email-confirmation',
			from: this._env.email.emailSender,
			to: toEmail,
			subject: 'Confirmation you email registration',
			context: {
				tokenUrl,
			},
		});
	}
}
