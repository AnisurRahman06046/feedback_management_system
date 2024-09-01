// import {
//   HttpException,
//   HttpStatus,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

// import * as bcrypt from 'bcrypt';
// import { User } from 'src/users/entities/user.entity';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<User>,
//     private jwtService: JwtService,
//   ) {}

//   //   sign up
//   async registerUser(payload: CreateUserDto) {
//     const isUserExist = await this.userModel.findOne({ email: payload.email });
//     if (isUserExist)
//       throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
//     const user = await this.userModel.create(payload);
//     if (!user)
//       throw new HttpException('Failed to create', HttpStatus.BAD_REQUEST);
//     // Exclude the password from the returned document
//     const userWithoutPassword = await this.userModel
//       .findById(user._id)
//       .select('-hashedPassword')
//       .exec();

//     return userWithoutPassword;
//   }

//   // sign in
//   async login(payload: { email: string; hashedPassword: string }) {
//     const user = await this.userModel.findOne({ email: payload.email });
//     const isMatch = await bcrypt.compare(
//       payload.hashedPassword,
//       user.hashedPassword,
//     );
//     console.log(payload.hashedPassword);
//     console.log(isMatch);
//     if (!isMatch) throw new UnauthorizedException();

//     const tokenPayload = { _id: user._id, email: user.email, role: user.role };
//     const token = await this.jwtService.signAsync(tokenPayload);
//     return { access_token: token };
//   }
// }

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // Sign up
  async registerUser(payload: CreateUserDto) {
    const isUserExist = await this.userModel.findOne({ email: payload.email });
    if (isUserExist)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    // Hash the password before saving it
    // const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await this.userModel.create(payload);

    if (!user)
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);

    // Exclude the password from the returned document
    const userWithoutPassword = await this.userModel
      .findById(user._id)
      .select('-password') // Exclude the password
      .exec();

    return userWithoutPassword;
  }

  // Sign in
  async login(payload: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: payload.email });
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const tokenPayload = { _id: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(tokenPayload);
    return { access_token: token };
  }
}
