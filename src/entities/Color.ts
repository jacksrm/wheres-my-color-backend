import { v4 } from 'uuid';

interface ColorProps {
  values: {
    hex: string,
    rgb: string,
  };
  title?: string
}
export class Color {
  public readonly _id: string;

  public values: {
    hex: string,
    rgb: string,
  };

  public title?: string;

  constructor(props: ColorProps, id: string = v4()) {
    this.values = props.values;
    this.title = props.title;
    this._id = id;
  }
}
