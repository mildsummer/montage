import 'tracking';
import 'tracking/build/data/face';
import FeatureTracker from './FeatureTracker';
import Face from './Face';
import Console from './Console';

const tracking = window.tracking;

export default class FaceTracker {
  constructor() {
    this.tracker = new tracking.ObjectTracker('face');
    this.tracker.setStepSize(1.7);
    this.onTrack = this.onTrack.bind(this);
    this.tracker.on('track', this.onTrack);
  }

  /**
   * トラッキング完了時
   * @private
   * @param event
   */
  onTrack(event) {
    this.rects = event.data;

    // console
    Console((canvas, context) => {
      canvas.width = this.image.width;
      canvas.height = this.image.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(this.image, 0, 0);
      context.strokeStyle = 'green';
      event.data.forEach((rect) => {
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      });
    });

    this.extractFaceImages(20);
    this.trackFaceFeature();
  }

  /**
   * トラッキングを開始
   * @param {string} imageSelector
   */
  track(imageSelector) {
    tracking.track(imageSelector, this.tracker);
    this.image = document.querySelector(imageSelector);
  }

  extractFaceImages(margin = 0) {
    this.faces = [];
    this.rects.forEach((rect) => {
      Console((canvas, context) => {
        const width = rect.width + margin * 2;
        const height = rect.height + margin * 2;
        const x = rect.x - margin;
        const y = rect.y - margin;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(
          this.image,
          x, y, width, height,
          0, 0, width, height
        );
        this.faces.push(new Face(canvas, x, y));
      });
    });
  }

  trackFaceFeature(index = 0) {
    const face = this.faces[index];
    const featureTracker = new FeatureTracker();
    featureTracker.track(face.imageURL).then((positions) => {
      Console((canvas, context) => {
        canvas.width = face.width;
        canvas.height = face.height;
        context.putImageData(face.imageData, 0, 0);
        featureTracker.draw(canvas);
      });
      face.setPositions(positions);

      // 再帰
      if (index < this.faces.length - 1) {
        this.trackFaceFeature(index + 1);
      }
    });
  }
}
