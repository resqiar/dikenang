import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Attachments } from './attachments.entity'

@Entity()
@ObjectType()
export class UriPath {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column()
	uri: string

	@Field((type) => Attachments)
	@ManyToOne(
		(type) => Attachments,
		(attachments: Attachments) => attachments.id
	)
	attachments: Attachments
}
