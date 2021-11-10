import 'dotenv/config';
import { connection } from '@repositories/connection';
import { app } from './app';

const connect = connection();

const { PORT, API_URL } = process.env;
app.listen(PORT || 3333, async () => {
  console.info(`App Running on: ${API_URL}:${PORT}/`);
  await connect.start();
});
