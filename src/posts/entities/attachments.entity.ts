import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

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

	@Field((type) => [String])
	@Column('text', { default: [], array: true })
	uri: string[]
}
