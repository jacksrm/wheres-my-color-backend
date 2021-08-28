import connection from 'mongoose';

connection.set('useNewUrlParser', true);
connection.set('useFindAndModify', false);
connection.set('useCreateIndex', true);
connection.set('useUnifiedTopology', true);
connection.connect(process.env.DATABASE_URL || '');

connection.Promise = global.Promise;

export default connection;
