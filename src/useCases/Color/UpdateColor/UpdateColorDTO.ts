export interface IUpdateColorRequestDTO {
  userId: string;
  colorId: string;
  paletteId: string;
  values?: {
    hex: string;
    rgb: string;
  };
  title?: string;
}
