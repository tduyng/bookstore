import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
	const options = new DocumentBuilder()
		.setTitle('Bookstore')
		.setDescription('All API of bookstore app')
		.setVersion('0.0.1')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api/docs', app, document);
};
