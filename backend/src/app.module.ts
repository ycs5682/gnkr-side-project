import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedModule } from 'src/feed/feed.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [TypeOrmModule.forRoot(), FeedModule, UserModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
