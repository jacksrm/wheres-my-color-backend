import PaletteInterface from '@interfaces/PaletteInterface';
import connection from '../connection';
import ColorSchema from './ColorSchema';

const PaletteSchema = new connection.Schema<PaletteInterface>({
  owner: { type: connection.Types.ObjectId, require: true },
  colors: [ColorSchema],
  name: { type: String, require: true },
  public: { type: Boolean, require: true },
  membersID: [connection.Types.ObjectId],
  canChange: [connection.Types.ObjectId],
});

export default PaletteSchema;
