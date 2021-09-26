export default class SpriteSheet {
  image: HTMLImageElement;
  width: number;
  height: number;
  tiles: Map<string, HTMLCanvasElement>;
  constructor(image: HTMLImageElement, w = 32, h = 32) {
    this.image = image;
    this.width = w;
    this.height = h;
    this.tiles = new Map();
  }

  define(name: string, x: number, y: number) {
    const buffer = document.createElement("canvas");

    buffer.height = this.height;
    buffer.width = this.width;

    buffer
      .getContext("2d")!
      .drawImage(
        this.image,
        this.width * x,
        this.height * y,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );

    this.tiles.set(name, buffer);
  }

  draw(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    const buffer = this.tiles.get(name)!;
    context.drawImage(buffer, x, y);
  }

  drawTile(
    name: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ) {
    this.draw(name, context, x * this.width, y * this.height);
  }

  rotate(
    gameObject: { code: string; rotate: number; degree: number },
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ) {
    context.clearRect(x * this.width, y * this.height, this.width, this.width);

    /** @type {CanvasRenderingContext2D} */
    // const ctx = buffer.getContext('2d');
    const buffer = this.tiles.get(gameObject.code)!;

    const copyBuffer = document.createElement("canvas");
    copyBuffer.width = buffer.width;
    copyBuffer.height = buffer.height;

    const copyContext = copyBuffer.getContext("2d")!;

    // Draw your canvas onto the second canvas
    copyContext.translate(this.width / 2, this.height / 2);

    gameObject.rotate = 90;

    const radians = (gameObject.degree / 180) * Math.PI;
    copyContext.rotate(radians);
    // Draw the second canvas back to the (now rotated) main canvas:
    copyContext.drawImage(buffer, -buffer.width / 2, -buffer.height / 2);

    context.drawImage(copyBuffer, x * this.width, y * this.height);
  }
}
