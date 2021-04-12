import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

	@Field()
	@Column()
	password: string

	@Field(() => [String], { nullable: true })
	@Column('text', { array: true, nullable: true })
	access_token: string

	@Field({ nullable: true })
	@Column('text', { nullable: true, default: 'Hi there!' })
	bio: string

	@Field({ nullable: true })
	@Column('text', { nullable: true })
	avatar_url: string
}
