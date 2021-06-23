import { ObjectType, Field } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Relationship } from '../../relationship/entities/relationship.entity'
import { User } from '../../users/entities/user.entity'
import { Attachments } from './attachments.entity'

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
	@Column({ nullable: true, default: 'public' })
	type: string

	@Field({ nullable: true })
	@CreateDateColumn()
	created_at: Date

	@Field({ nullable: true })
	@UpdateDateColumn()
	updated_at: Date

	@Field((_) => User)
	@ManyToOne((_) => User, (author: User) => author.contents)
	author: User

	@Field((_) => Attachments, { nullable: true })
	@OneToOne(() => Attachments)
	@JoinColumn()
	attachments: Attachments

	// Relation table with partner relationship
	@Field((_) => Relationship, { nullable: true })
	@ManyToOne(
		(_) => Relationship,
		(relationship: Relationship) => relationship.posts,
		{
			onDelete: 'SET NULL',
		}
	)
	relationship: Relationship
}
