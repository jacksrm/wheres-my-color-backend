import connection from '@database/connection';
import PaletteSchema from '@database/schemas/PaletteSchema';
import PaletteInterface from '@interfaces/PaletteInterface';

const Palette = connection.model<PaletteInterface>('Color', PaletteSchema);

export default Palette;
