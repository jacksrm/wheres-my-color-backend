import ColorInterface from '@interfaces/ColorInterface';
import connection from '../connection';

const ColorSchema = new connection.Schema<ColorInterface>({
  value: { type: String, require: true },
  title: String,
});

export default ColorSchema;
