import { ObjectType, Field } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Post {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column('text')
	caption: string

	@Field({ nullable: true })
	@CreateDateColumn()
	created_at: Date

	@Field({ nullable: true })
	@UpdateDateColumn()
	updated_at: Date

	@Field()
	@Column()
	author_id: string

	@Field((type) => User)
	@ManyToOne((type) => User, (author: User) => author.id)
	author: User
}