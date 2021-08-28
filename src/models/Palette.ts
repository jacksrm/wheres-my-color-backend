import PaletteSchema from '@database/schemas/PaletteSchema';
import PaletteInterface from '@interfaces/PaletteInterface';
import { model } from 'mongoose';

const Palette = model<PaletteInterface>('Color', PaletteSchema);

export default Palette;
