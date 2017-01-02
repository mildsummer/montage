import '../sass/style.sass';
import pModel from 'clmtrackr/models/model_pca_20_svm';
import FaceDeformer from 'clmtrackr/js/face_deformer';
import FaceTracker from './FaceTracker';

const source = document.querySelector('.sourceCanvas');
const canvas = document.querySelector('.resultCanvas');
const context = source.getContext('2d');
const tracker = new FaceTracker();
const tracker2 = new FaceTracker();
tracker.load('./materials/001.jpg', () => {
  tracker2.load('./materials/004.jpg', () => {
    // マスクを描画するクラスをインスタンス化
    const fd = new FaceDeformer();
    // マスクを描画するcanvasを指定
    const { width, height } = tracker2.image;
    source.width = canvas.width = width;
    source.height = canvas.height = height;
    context.drawImage(tracker2.image, 0, 0, width, height);

    // マスク用画像の読み込み
    fd.init(canvas);
    const img = new Image();
    img.onload = function () {
      // マスクの設定
      fd.load(img, tracker.positions, pModel);
    };
    img.src = './materials/001.jpg';
    console.log(pModel);

    const positions = tracker2.positions;
    console.log(tracker.positions, positions);
    window.setTimeout(() => {
      fd.draw(positions);
    }, 1000);
  });
});
