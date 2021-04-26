import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Attachments } from './entities/attachments.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Attachments])],
})
export class AttachmentsModule {}
