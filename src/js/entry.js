import '../sass/style';
import FaceTracker from './modules/FaceTracker';
import Montager from './modules/Montager';

const faceTracker = new FaceTracker();
const faceTracker2 = new FaceTracker();
faceTracker.track('#img', (faces) => {
  faceTracker2.track('#base', (baseFaces) => {
    console.log('-------!!!success!!!-------', faces);
    const montager = new Montager();
    montager.init(faceTracker2.image.src, baseFaces, faces, () => {
      const image = new Image();
      image.src = document.querySelector('canvas').toDataURL();
      document.querySelector('div').appendChild(image);
    });
  });
});
