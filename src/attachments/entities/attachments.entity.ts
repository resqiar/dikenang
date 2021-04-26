import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/posts/entities/post.entity'
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
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
