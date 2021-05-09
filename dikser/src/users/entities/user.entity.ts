import { ObjectType, Field, Int } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Post } from '../../posts/entities/post.entity'

@ObjectType()
@Entity()
export class User {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column({
		unique: true,
	})
	username: string

	@Field()
	@Column({
		unique: true,
	})
	email: string

	@Column({ select: false })
	password: string

	@Field({ nullable: true })
	@Column('text', { nullable: true })
	access_token: string

	@Field({ nullable: true })
	@Column('text', { nullable: true, default: 'Hi there!' })
	bio: string

	@Field({ nullable: true })
	@Column('text', { nullable: true })
	avatar_url: string

	@Field({ nullable: true })
	@CreateDateColumn()
	created_at: Date

	@Field({ nullable: true })
	@UpdateDateColumn()
	updated_at: Date

	@Field((type) => [Post], { nullable: true })
	@OneToMany((type) => Post, (contents: Post) => contents.author)
	contents: Post[]
}