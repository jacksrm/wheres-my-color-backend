import 'dotenv/config';
import app from './app';

const port = process.env.PORT;
const url = process.env.API_URL;

app.listen(port, () => {
  console.log(`App Running on: ${url}:${port}/`);
});
