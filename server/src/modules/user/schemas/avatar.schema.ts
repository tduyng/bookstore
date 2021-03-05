import { User } from '@modules/user/schemas/user.schema';
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Avatar extends Document {
	@Prop({ type: 'Buffer', required: true })
	data: any;

	@Prop({ type: String, required: true })
	key: string;

	@Prop({ type: Types.ObjectId, required: true, ref: 'User' })
	owner: User['_id'];
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
