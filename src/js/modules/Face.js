import Point from './Point';

export default class Face {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.imageURL = canvas.toDataURL();
    this.imageData = canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height);
    this.width = canvas.width;
    this.height = canvas.height;
    this.x = x;
    this.y = y;
    this.point = new Point(x, y);
  }

  setPositions(positions) {
    this.positions = positions;
    this.absolutePositions = positions.map((position) => ([
      position[0] + this.x,
      position[1] + this.y
    ]));
  }
}
