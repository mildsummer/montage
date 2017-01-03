export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance(point) {
    return Math.sqrt(
      (this.x - point.x) * (this.x - point.x) +
      (this.y - point.y) * (this.y - point.y)
    );
  }
}
