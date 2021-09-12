import 'dotenv/config';
import { app } from './app';

const { PORT, API_URL } = process.env;
app.listen(PORT || 3333, () => {
  console.info(`App Running on: ${API_URL}:${PORT}/`);
});
