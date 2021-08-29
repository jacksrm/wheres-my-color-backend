import 'dotenv/config';
import { connect, connection } from 'mongoose';
import app from './app';

const { PORT, API_URL } = process.env;

app.listen(3333, () => {
  console.info(`App Running on: ${API_URL}:${PORT}/`);
  connect(process.env.DATABASE_URL || '', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  connection.on('open', () => {
    console.info('Connected to Atlas MongoDB Server.');
  });

  connection.on('error', (err: any) => {
    console.error(err);
  });
});
