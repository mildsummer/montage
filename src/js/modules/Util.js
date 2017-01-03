export function getImageDataFromGL(canvas, sx, sy, sw, sh) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const context = tempCanvas.getContext('2d');
      tempCanvas.width = image.width;
      tempCanvas.height = image.height;
      context.drawImage(image, 0, 0);
      resolve(context.getImageData(sx, sy, sw, sh));
    };
    image.src = canvas.toDataURL();
    if (!image.src) {
      reject();
    }
  });
}
