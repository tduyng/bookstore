import { JwtAuth } from '@modules/auth/guards';
import { User } from '@modules/user/user.schema';
import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Post,
	Req,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Model } from 'mongoose';
import { UserFromRequest } from 'src/common/types';
import { Avatar } from './avatar.schema';

@JwtAuth()
@Controller('avatars')
@ApiTags('Avatar')
export class AvatarController {
	constructor(
		@InjectModel(Avatar.name) private avatarModel: Model<Avatar>,
		@InjectModel(User.name) private userModel: Model<User>,
	) {}

	@Get('/:key')
	public async getByKey(@Param('key') key: string, @Req() req: Request) {
		const image: Avatar = await this.avatarModel.findOne({ key }).lean();
		if (!image) {
			throw new BadRequestException('Image not exists');
		}
		req.res?.contentType('image/*');
		req.res?.send(image.data);
	}

	@Post('/upload')
	@UseInterceptors(FileInterceptor('file'))
	public async uploadImage(@Req() req: Request, @UploadedFile() file: any) {
		const user = req.user as UserFromRequest;
		if (!file) {
			throw new BadRequestException('Please choose a file');
		}
		const key = Date.now() + '-' + file.originalname;
		const data = file.buffer;

		try {
			// Transaction avatar & user thumbnail
			const session = await this.userModel.startSession();
			session.startTransaction();
			await this.avatarModel
				.findOneAndUpdate(
					{
						owner: user._id,
					},
					{ key, data },
					{ new: true, upsert: true },
				)
				.lean();

			const path = `/api/avatars/${key}`;
			const updated: User = await this.userModel
				.findByIdAndUpdate(user._id, { thumbnail: path })
				.lean();
			await session.commitTransaction();
			session.endSession();
			return updated;
		} catch (error) {
			throw new HttpException(error.message, 500);
		}
	}

	@Delete('/:key')
	public async deleteByKey(@Param('key') key: string) {
		await this.avatarModel.findOneAndDelete({ key }).lean();
		return { deleted: key };
	}
}
