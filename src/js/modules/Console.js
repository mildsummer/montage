/**
 * コンソールにCanvasの内容を表示する
 * @param {function} drawFunction
 */
export default function (drawFunction) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  drawFunction(canvas, context);
  console.log(
    '%c ', [
      'font-size:0',
      `background-image:url(${canvas.toDataURL()}) `,
      `padding:${canvas.height / 2}px ${canvas.width / 2}px`,
      `line-height:${canvas.height}px`,
      'border: solid 1px gray'
    ].join(';')
  );
}
