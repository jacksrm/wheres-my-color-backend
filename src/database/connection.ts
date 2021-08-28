import connection from 'mongoose';

connection.connect(process.env.DATABASE_URL || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.Promise = global.Promise;

export default connection;
