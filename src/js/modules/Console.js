/**
 * コンソールにCanvasの内容を表示する
 * @param {function} drawFunction
 */
export default function (drawFunction) {
  const sourceCanvas = document.createElement('canvas');
  let canvas = drawFunction(sourceCanvas, sourceCanvas.getContext('2d'));
  canvas = canvas || sourceCanvas;
  console.log(
    '%c ', [
      'font-size:0',
      `background-image:url(${canvas.toDataURL()}) `,
      `padding:${canvas.height / 2}px ${canvas.width / 2}px`,
      `line-height:${canvas.height}px`,
      'background-color:gray',
      'border: solid 1px gray'
    ].join(';')
  );
}
