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

	@Field((_) => [Post], { nullable: true })
	@ManyToMany(() => Post, (upvotes: Post) => upvotes.upvoter)
	@JoinTable()
	upvotes: Post[]

	@Field((_) => [Post], { nullable: true })
	@ManyToMany(() => Post, (downvotes: Post) => downvotes.downvoter)
	@JoinTable()
	downvotes: Post[]

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
}
