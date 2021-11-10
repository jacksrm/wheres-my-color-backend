import { connect, connection as mongooseConnection } from 'mongoose';

export function connection() {
  async function start() {
    await connect(process.env.DATABASE_URL || '', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    mongooseConnection.on('error', (err: any) => {
      console.error(err);
    });
  }

  async function close() {
    await mongooseConnection.close();
  }
  return {
    start,
    close,
  };
}
