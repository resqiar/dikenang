import { ObjectType, Field } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Comment } from '../../comments/entities/comment.entity'
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

	@Field(() => [User], { nullable: true })
	@ManyToMany((_) => User, (upvoter: User) => upvoter.upvotes, {
		onDelete: 'CASCADE',
	})
	upvoter: User[]

	@Field(() => [User], { nullable: true })
	@ManyToMany((_) => User, (downvoter: User) => downvoter.downvotes, {
		onDelete: 'CASCADE',
	})
	downvoter: User[]

	@Field(() => [User], { nullable: true })
	@ManyToMany((_) => User)
	@JoinTable()
	reachs: User[]

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
	@ManyToOne((_) => User, (author: User) => author.contents, {
		onDelete: 'CASCADE',
	})
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

	// Comment relations
	@Field((_) => [Comment], { nullable: true })
	@OneToMany((_) => Comment, (comments: Comment) => comments.post)
	comments: Comment[]
}
