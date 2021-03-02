import { HookNextFunction, Schema, Document } from 'mongoose';
import argon2 from 'argon2';

export class User extends Document {
	_id: string;
	email?: string;
	name: string;
	googleId?: string;
	permalink: string;
	thumbnail?: string;
	cart: any[];
	role: Roles;
}

export enum Roles {
	USER = 'User',
	ADMIN = 'Admin',
}

export const UserSchema = new Schema(
	{
		email: { type: String, unique: true },
		name: String,
		password: String,
		cart: { type: Array, default: [] },
		thumbnail: String,
		googleId: { type: String, required: false },
		role: { type: String, enum: Object.values(Roles), default: Roles.USER },
	},
	{ timestamps: true },
);

// Hook before insert or update
UserSchema.pre('save', encryptPassword);
UserSchema.pre('save', validateEmail);

/* Helper methods */
async function encryptPassword(
	this: User & { password: string },
	next: HookNextFunction,
) {
	try {
		if (!this.isModified('password')) return next();
		this.password = await argon2.hash(this.password);
		return next();
	} catch (error) {
		return next(error);
	}
}
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function validateEmail(this: User, next: HookNextFunction) {
	try {
		if (!this.email) return next();
		const isEmail = emailRegex.test(this.email);
		if (isEmail) return next();

		return next(new Error('Invalid email address'));
	} catch (error) {
		return next(error);
	}
}
