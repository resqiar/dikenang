import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'

@ObjectType()
@Entity()
export class Notification {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column()
	type: string

	@Field({ nullable: true })
	@Column({
		nullable: true,
		default: false,
	})
	read: boolean

	@Field()
	@Column()
	authorId: string

	@Field({ nullable: true })
	@Column({ nullable: true })
	relatedPostId: string

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
	@ManyToOne((_) => User, (relatedUser: User) => relatedUser.notifications, {
		onDelete: 'CASCADE',
	})
	relatedUser: User
}
