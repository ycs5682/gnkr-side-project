import * as bcrypt from 'bcrypt';
import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDto } from 'src/dto/user';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: UserDto) {
    const { email, password, name } = data;

    const dup = await this.userRepository
      .createQueryBuilder()
      .where('name = :name', { name })
      .orWhere('email = :email', { email })
      .getOne();

    if (dup) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.UNAUTHORIZED,
          error: 'Authentication failed',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.userRepository.save({ email, password: hash, name });
  }

  async updateUser(id: number, data: UserDto) {
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    const user = await this.userRepository.findOne({ id });

    const updated: User = Object.assign(user, data);
    updated.password = hash;

    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  async login(data: UserDto): Promise<User> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.UNAUTHORIZED,
          error: 'Authentication failed',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const dbPassword = user.password;
    const isMatch = await bcrypt.compare(password, dbPassword);

    if (!isMatch) {
      throw new HttpException(
        {
          // TODO: error msg
          status: HttpStatus.UNAUTHORIZED,
          error: 'Passwords do not match.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }
}
