import { ObjectType, Field } from '@nestjs/graphql'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@ObjectType()
@Entity()
export class Badge {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column({ unique: true })
	label: string

	@Field({ nullable: true })
	@Column({ nullable: true })
	description: string

	@Field()
	@Column({ nullable: true, default: 'outlined' })
	variant: string

	@Field({ nullable: true })
	@Column({ nullable: true })
	color: string

	@Field({ nullable: true })
	@Column({ nullable: true })
	background: string

	@Field({ nullable: true })
	@Column({ nullable: true })
	border: string

	@Field(() => [User], { nullable: true })
	@ManyToMany(() => User, (owners: User) => owners.badges, {
		onDelete: 'CASCADE',
	})
	owners: User[]
}
