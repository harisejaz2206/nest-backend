// import { User, UserSchema } from '../user/schemas/user.schema';
// import { MongooseModule } from '@nestjs/mongoose';

// export const databaseProviders = [
//   MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
// ];

import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://haris:haris@cluster0.qfui4tr.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
