import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';
import { Email } from './entities/email.entity';
import { EmailHelper } from './helpers/email.helper';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [EmailService, EmailResolver, EmailHelper],
})
export class EmailModule {}
