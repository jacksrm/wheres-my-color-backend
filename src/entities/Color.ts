import { v4 } from 'uuid';

interface ColorProps {
  value: string;
  title?: string
}
export class Color {
  public readonly _id: string;

  public value: string;

  public title?: string;

  constructor(props: ColorProps, id: string = v4()) {
    this.value = props.value;
    this.title = props.title;
    this._id = id;
  }
}
