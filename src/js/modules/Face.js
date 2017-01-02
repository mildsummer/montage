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
  }

  setPositions(positions) {
    this.positions = positions;
  }
}
