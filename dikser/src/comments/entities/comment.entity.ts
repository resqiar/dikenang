import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Post } from '../../posts/entities/post.entity'
import { User } from '../../users/entities/user.entity'

@ObjectType()
@Entity()
export class Comment {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column('text')
	text: string

	@Field({ nullable: true })
	@CreateDateColumn({
		type: 'timestamp with time zone',
	})
	created_at: Date

	@Field({ nullable: true })
	@UpdateDateColumn({
		type: 'timestamp with time zone',
	})
	updated_at: Date

	@Field((_) => User)
	@ManyToOne((_) => User, (author: User) => author.comments)
	author: User

	@Field((_) => Post)
	@ManyToOne((_) => Post, (post: Post) => post.comments)
	post: Post
}
