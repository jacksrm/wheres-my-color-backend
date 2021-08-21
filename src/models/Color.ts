import ColorInterface from '@interfaces/ColorInterface';

class Color implements ColorInterface {
  title?: string | undefined;

  constructor(readonly id: string, public value: string) {}
}

export default Color;
