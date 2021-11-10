export interface ICreateColorRequestDTO {
  paletteId: string;
  title?: string;
  values: {
    hex: string;
    rgb: string;
  }
}
