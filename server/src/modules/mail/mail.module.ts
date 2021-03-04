import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import sendGridTransport from 'nodemailer-sendgrid-transport';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MailerModule.forRoot({
			transport: sendGridTransport({
				auth: {
					api_key: process.env.SENDGRID_API_KEY,
				},
			}),
			defaults: {
				from: `"Bookstore" <${process.env.EMAIL_AUTH_USER}>`,
			},
			preview: process.env.NODE_ENV === 'development',
			template: {
				dir: process.cwd() + '/src/modules/mail/templates',
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
})
export class EmailProviderModule {}
