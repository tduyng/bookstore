import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Document, HookNextFunction } from 'mongoose';
import slugify from 'slugify';

@Schema({ timestamps: true })
export class Book extends Document {
	@Prop()
	title: string;

	@Prop()
	author: string;

	@Prop({ type: Number })
	price: number;

	@Prop({ type: Number })
	old_price: number;

	@Prop()
	imgURL: string;

	@Prop()
	genre: string;

	@Prop()
	slug: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

// Hook before insert or update
BookSchema.pre('save', updateSlug);

/* Helper methods */
async function updateSlug(this: Book, next: HookNextFunction) {
	try {
		if (!this.isModified('title')) return next();
		const randomString = randomBytes(6).toString('hex').substr(0, 6);
		this.slug = slugify(this.title, { lower: true }) + '-' + randomString;
		return next();
	} catch (error) {
		return next(error);
	}
}
