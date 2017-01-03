import pModel from 'clmtrackr/models/model_pca_20_svm';
import { minBy } from 'lodash';
import faceDeformer from './faceDeformer';
import Blender from './Blender';
import { getImageDataFromGL } from './Util';

export default class Montager {
  constructor() {
    this.onLoadBaseImage = this.onLoadBaseImage.bind(this);
    // マスクを描画するクラスをインスタンス化
    this.fd = new faceDeformer();
    this.canvas = document.querySelector('canvas');
  }

  init(baseImageURL, baseFaces, faces, callback) {
    this.baseFaces = baseFaces;
    this.faces = faces;
    this.callback = callback;
    this.image = new Image();
    this.image.onload = this.onLoadBaseImage;
    this.image.src = baseImageURL;
    if (this.image.width) {
      this.onLoadBaseImage();
    }
  }

  onLoadBaseImage() {
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.fd.init(this.canvas);
    this.draw();
  }

  draw() {
    this.baseFaces.forEach((baseFace) => {
      // 最も近い顔を選ぶ
      const targetFace = minBy(
        this.faces,
        (face) => (baseFace.point.distance(face.point))
      );
      const faceImage = new Image();
      faceImage.onload = () => {
        this.fd.load(faceImage, targetFace.positions, pModel);
        this.fd.draw(baseFace.absolutePositions);

        // blend
        getImageDataFromGL(
          this.canvas,
          baseFace.x, baseFace.y, baseFace.width, baseFace.height
        ).then((imageData) => {
          const blender = new Blender();
          const distCanvas = blender.blend(baseFace.imageData, imageData);
          document.querySelector('.dist').appendChild(distCanvas);
          distCanvas.style.position = 'absolute';
          distCanvas.style.top = `${baseFace.y}px`;
          distCanvas.style.left = `${baseFace.x}px`;
        });
      };
      faceImage.src = targetFace.imageURL;
    });
  }
}
