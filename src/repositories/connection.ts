import { connect, connection as mongooseConnection } from 'mongoose';

export function connection() {
  function start() {
    connect(process.env.DATABASE_URL || '', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    mongooseConnection.on('open', () => {
      console.info('Connected to Atlas MongoDB Server.');
    });

    mongooseConnection.on('error', (err: any) => {
      console.error(err);
    });
  }

  return {
    start,
  };
}
