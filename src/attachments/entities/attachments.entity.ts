import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Attachments {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column()
	type: string

	@Field()
	@Column()
	extensions: string

	@Field()
	@Column()
	path: string
}
