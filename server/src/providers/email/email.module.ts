import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import sendGridTransport from 'nodemailer-sendgrid-transport';
import { EmailService } from './email.service';

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
				from: `"No Reply" <noreply@nestjs.com>`,
			},
			preview: process.env.NODE_ENV === 'development',
			template: {
				dir: process.cwd() + '/src/providers/email/templates',
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
