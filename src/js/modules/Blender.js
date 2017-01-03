import { minBy } from 'lodash';
import RichImageData from './RichImageData';
import Console from './Console';

const BLEND_PIXELS = 20;

export default class Blender {
  blend(baseImageData, targetImageData) {
    const distCanvas = document.createElement('canvas');
    distCanvas.width = baseImageData.width;
    distCanvas.height = baseImageData.height;
    const distContext = distCanvas.getContext('2d');
    distContext.putImageData(baseImageData, 0, 0);
    const baseRichImageData =
      new RichImageData(baseImageData);
    const targetRichImageData =
      new RichImageData(targetImageData);
    this.console(baseRichImageData.getColor(100, 100));
    this.console(targetRichImageData.getColor(100, 100));
    for (let x = 0; x < baseRichImageData.width; x++) {
      for (let y = 0; y < baseRichImageData.height; y++) {
        const targetLightness = targetRichImageData.getColor(x, y).getLightness();
        const alpha = targetRichImageData.getColor(x, y).a / 255;
        const colors = baseRichImageData.getColors(
          x - BLEND_PIXELS / 2, y - BLEND_PIXELS / 2,
          BLEND_PIXELS, BLEND_PIXELS
        );
        const nearestColor = minBy(
          colors,
          (color) => (Math.abs(targetLightness - color.getLightness()))
        );
        distContext.fillStyle = nearestColor;
        distContext.globalAlpha = alpha;
        distContext.fillRect(x, y, 1, 1);
      }
    }
    Console(() => (distCanvas));
    return distCanvas;
  }

  console(color) {
    Console((canvas, context) => {
      canvas.width = 20;
      canvas.height = 20;
      context.fillStyle = color.toString();
      context.fillRect(0, 0, 20, 20);
    });
  }
}
