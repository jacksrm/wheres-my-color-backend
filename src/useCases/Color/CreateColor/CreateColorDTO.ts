export interface ICreateColorRequestDTO {
  userId: string;
  paletteId: string;
  title?: string;
  values: {
    hex: string;
    rgb: string;
  }
}
