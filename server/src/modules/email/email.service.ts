import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EnvConfig, envConfig } from 'src/common/config/env.config';

@Injectable()
export class EmailService {
	private _env: EnvConfig;
	constructor(private mailer: MailerService) {
		this._env = envConfig();
	}

	public sendWelcome(toEmail: string) {
		return this.mailer.sendMail({
			template: 'welcome',
			from: this._env.email.emailSender,
			to: toEmail,
			subject: '🥳🎉 Welcome to the Bookstore',
			context: {
				siteUrl: this._env.clientUrl,
			},
		});
	}

	public sendResetPassword(toEmail: string, token: string) {
		const tokenUrl = `${this._env.serverUrl}/reset-password/${token}`;
		return this.mailer.sendMail({
			template: 'reset-password',
			from: this._env.email.emailSender,
			to: toEmail,
			subject: '🔑 Request to recover your password',
			context: {
				tokenUrl,
			},
		});
	}

	public sendEmailConfirmation(toEmail: string, token: string) {
		const tokenUrl = `${this._env.serverUrl}/active/${token}`;
		return this.mailer.sendMail({
			template: 'email-confirmation',
			from: this._env.email.emailSender,
			to: toEmail,
			subject: '🔑 Confirmation you email registration',
			context: {
				tokenUrl,
			},
		});
	}
}
