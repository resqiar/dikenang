import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'

@ObjectType()
@Entity()
export class Relationship {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field({ nullable: true })
	@Column({ nullable: true })
	type: string

	@Field({ nullable: true })
	@Column('text', {
		nullable: true,
	})
	description: string

	@Field({ nullable: true })
	@CreateDateColumn()
	created_at: Date

	@Field({ nullable: true })
	@UpdateDateColumn()
	updated_at: Date

	@Field((_) => [User], { nullable: true })
	@OneToMany((_) => User, (partnership: User) => partnership.relationship)
	partnership: User[]
}
