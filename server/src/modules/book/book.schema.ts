import { randomBytes } from 'crypto';
import { Document, HookNextFunction, Schema } from 'mongoose';
import slugify from 'slugify';

export class Book extends Document {
	_id: string;
	title: string;
	author: string;
	price: number;
	old_price: number;
	imgURL: string;
	genre: string;
	slug: string;
}

export const BookSchema = new Schema(
	{
		title: String,
		author: String,
		price: Number,
		old_price: Number,
		imgURL: String,
		genre: String,
		slug: String,
	},
	{
		timestamps: true,
	},
);

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
