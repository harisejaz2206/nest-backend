// import { Module, OnModuleInit } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { InjectConnection } from '@nestjs/mongoose';
// import { Connection } from 'mongoose';

// @Module({
//   imports: [
//     MongooseModule.forRoot(
//       'mongodb+srv://haris:haris@cluster0.qfui4tr.mongodb.net/?retryWrites=true&w=majority',
//     ),
//   ],
//   exports: [MongooseModule],
// })
// export class DatabaseModule implements OnModuleInit {
//   constructor(@InjectConnection() private connection: Connection) {}

//   onModuleInit() {
//     this.connection.on('connected', () => {
//       console.log('Database connected successfully');
//     });

//     this.connection.on('error', (error) => {
//       console.error('Database connection error:', error);
//     });
//   }
// }
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { userProviders } from '../user/user.providers';

@Module({
  providers: [...databaseProviders, ...userProviders],
  exports: [...databaseProviders, ...userProviders],
})
export class DatabaseModule {}
