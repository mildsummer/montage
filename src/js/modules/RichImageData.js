import Color from './Color';

export default class RichImageData {
  constructor(imageData) {
    this.width = imageData.width;
    this.height = imageData.height;
    this.data = imageData.data;
  }

  getColor(x, y) {
    const index = (x + y * this.width) * 4;
    const data = this.data;
    return new Color(data[index], data[index + 1], data[index + 2], data[index + 3]);
  }

  getColors(sx, sy, sw, sh) {
    const colors = [];
    const startX = Math.min(Math.max(0, sx), this.width - 1);
    const startY = Math.min(Math.max(0, sy), this.height - 1);
    const endX = Math.min(Math.max(sx + sw), this.width - 1);
    const endY = Math.min(Math.max(sy + sh), this.height - 1);
    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        colors.push(this.getColor(x, y));
      }
    }
    return colors;
  }
}
