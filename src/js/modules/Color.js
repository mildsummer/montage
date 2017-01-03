export default class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  getLightness() {
    return 0.298912 * this.r + 0.586611 * this.g + 0.114478 * this.b;
  }

  clone() {
    return new Color(this.r, this.g, this.b, this.a);
  }

  setR(r) {
    this.r = r;
    return this;
  }

  setG(g) {
    this.g = g;
    return this;
  }

  setB(b) {
    this.b = b;
    return this;
  }

  setA(a) {
    this.a = a;
    return this;
  }
}
