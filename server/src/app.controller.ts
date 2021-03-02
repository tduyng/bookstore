import { Controller, Get, HttpStatus, Response } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';
import { AppService } from './app.service';

@Controller()
@ApiTags('Root')
export class AppController {
	constructor(
		private readonly appService: AppService,
		@InjectConnection() private readonly connection: Connection,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('/health')
	healthCheck(@Response() res) {
		if (this.connection.readyState === 1) {
			res.status(HttpStatus.OK).json({ db: { status: 'up' } });
		} else {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ db: { status: 'down' } });
		}
	}
}
