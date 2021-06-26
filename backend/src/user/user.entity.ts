import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Feed } from 'src/feed/feed.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Feed, (feed) => feed.user, {
    nullable: true,
    // foreign key constraint failed 対応
    onDelete: 'CASCADE',
  })
  feed: Feed[];

  //  TODO: mysqlに変更する場合、datetime -> timestampに変更
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
