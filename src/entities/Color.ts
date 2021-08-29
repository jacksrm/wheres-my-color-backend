export default class Color {
  public value: string;

  public title?: string;

  constructor(props: Color) {
    this.value = props.value;
    this.title = props.title;
  }
}
