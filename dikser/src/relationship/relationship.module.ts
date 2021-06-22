import { Module } from '@nestjs/common'
import { RelationshipService } from './relationship.service'
import { RelationshipResolver } from './relationship.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Relationship } from './entities/relationship.entity'
import { UsersModule } from '../users/users.module'

@Module({
	imports: [TypeOrmModule.forFeature([Relationship]), UsersModule],
	providers: [RelationshipResolver, RelationshipService],
})
export class RelationshipModule {}
