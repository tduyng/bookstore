import { User } from '@modules/user/user.schema';
import { Document, Schema } from 'mongoose';

export class Avatar extends Document {
	_id: string;
	data: Buffer;
	key: string;
	owner: string;
}

export const AvatarSchema = new Schema({
	data: { type: Buffer, required: true },
	owner: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
	key: { type: String, required: true },
});
