import clm from 'clmtrackr/clmtrackr';
import pModel from 'clmtrackr/models/model_pca_20_svm';
import { minBy, maxBy } from 'lodash';

export default class FeatureTracker {
  constructor() {
    this.onSuccess = this.onSuccess.bind(this);
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.ctracker = new clm.tracker({
      stopOnConvergence: true,
      scoreThreshold: 0.3
    });
    this.ctracker.init(pModel);
  }

  track(imageUrl) {
    const image = new Image();
    const { canvas, context, ctracker } = this;
    return new Promise((resolve) => {
      image.onload = () => {
        const { width, height } = image;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, 0, 0, width, height);
        ctracker.start(canvas);
      };
      const onSuccess = () => {
        const positions = ctracker.getCurrentPosition();
        if (positions) {
          this.positions = positions;
          this.rect = this.getBoundingRect();
          ctracker.stop();
          document.removeEventListener('clmtrackrConverged', onSuccess);
          resolve(positions);
        }
      };
      document.addEventListener('clmtrackrConverged', onSuccess, false);
      image.src = imageUrl;
      this.image = image;
    });
  }

  onSuccess() {
  }

  getRect(margin = 0) {
    const { left, top, width, height } = this.rect;
    return {
      left: left - margin,
      top: top - margin,
      width: width + margin * 2,
      height: height + margin * 2
    };
  }

  getOutlinePositions() {
    const positions = this.positions;
    const outlinePositions = positions.slice(0, 23);
    outlinePositions[19] = positions[22];
    outlinePositions[20] = positions[21];
    outlinePositions[21] = positions[20];
    outlinePositions[22] = positions[19];
    return outlinePositions;
  }

  getBoundingRect() {
    const positions = this.positions;
    const left = minBy(positions, (position) => (position[0]))[0];
    const maxX = maxBy(positions, (position) => (position[0]))[0];
    const top = minBy(positions, (position) => (position[1]))[1];
    const maxY = maxBy(positions, (position) => (position[1]))[1];
    return { left, top, width: maxX - left, height: maxY - top };
  }

  draw(canvas) {
    this.ctracker.draw(canvas);
  }
}
