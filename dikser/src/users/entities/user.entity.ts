import { ObjectType, Field } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Badge } from '../../badges/entities/badge.entity'
import { Comment } from '../../comments/entities/comment.entity'
import { Notification } from '../../notifications/entities/notifications.entity'
import { Post } from '../../posts/entities/post.entity'
import { Relationship } from '../../relationship/entities/relationship.entity'

@ObjectType()
@Entity()
export class User {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ nullable: true, unique: true })
	oauth_id: string

	@Field({ nullable: true })
	@Column({ nullable: true, default: 'Human' })
	fullname: string

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

	@Field({ nullable: true })
	@Column('text', {
		nullable: true,
		default: 'Hello and welcome to dikenang!',
	})
	bio: string

	@Field({ nullable: true })
	@Column('text', {
		nullable: true,
	})
	greeting: string

	@Field(() => Boolean)
	@Column('boolean', { nullable: true, default: false })
	/**
	 * Temporary field,
	 * whenever application grows,
	 * this field should be moved to their own
	 * table and relations
	 */
	verified: boolean

	@Field({ nullable: true })
	@Column('text', { nullable: true })
	avatar_url: string

	@Field({ nullable: true })
	@CreateDateColumn()
	created_at: Date

	@Field({ nullable: true })
	@UpdateDateColumn()
	updated_at: Date

	@Field((_) => [Post], { nullable: true })
	@OneToMany((_) => Post, (contents: Post) => contents.author)
	contents: Post[]

	// User Comment Relations
	@Field((_) => [Comment], { nullable: true })
	@OneToMany((_) => Comment, (comments: Comment) => comments.author)
	comments: Comment[]

	@Field((_) => [Post], { nullable: true })
	@ManyToMany(() => Post, (upvotes: Post) => upvotes.upvoter)
	@JoinTable()
	upvotes: Post[]

	@Field((_) => [Post], { nullable: true })
	@ManyToMany(() => Post, (downvotes: Post) => downvotes.downvoter)
	@JoinTable()
	downvotes: Post[]

	@Field(() => [Post], { nullable: true })
	@ManyToMany((_) => Post)
	viewed: Post[]

	@Field((_) => Relationship, { nullable: true })
	@ManyToOne(
		(_) => Relationship,
		(relationship: Relationship) => relationship.partnership,
		{
			onDelete: 'SET NULL',
		}
	)
	relationship: Relationship

	@Field((_) => [Badge], { nullable: true })
	@ManyToMany(() => Badge, (badges: Badge) => badges.owners)
	@JoinTable()
	badges: Badge[]

	// Notifications
	@Field((_) => [Notification], { nullable: true })
	@OneToMany(
		(_) => Notification,
		(notifications: Notification) => notifications.relatedUser
	)
	notifications: Notification[]

	@Field((_) => [User], { nullable: true })
	@ManyToMany(() => User, (user) => user.following)
	@JoinTable()
	followers: User[]

	@Field((_) => [User], { nullable: true })
	@ManyToMany(() => User, (user) => user.followers)
	following: User[]
}
