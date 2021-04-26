import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UriPath } from './uri-path.entity'

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

	@Field((type) => [UriPath])
	@OneToMany((type) => UriPath, (path: UriPath) => path.uri)
	path: UriPath[]
}
