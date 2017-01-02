import PIXI from 'pixi';

export default class Montager {
  constructor(baseImageUrl, baseFaces) {
    this.baseFaces = baseFaces;
    this.image = new Image();
    this.image.onload = this.init.bind(this);
    this.image.src = baseImageUrl;
  }

  init() {
    const renderer = PIXI.autoDetectRenderer(800, 600);
    // document.body.appendChild(renderer.view);
    const stage = new PIXI.Container();
    const verticesX = this.faces.map(() => ());
    var uvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
    var triangles = new Uint16Array([0, 1, 2, 3, 2, 1]);

    var texture = PIXI.Texture.fromImage('res/ship.png');
    var ship = new PIXI.mesh.Mesh(
      texture,
      verts, uvs, triangles,
      PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES);

    var touchMove = function (event) {
      // 矩形の右下の点を移動するテスト
      verts[6] = event.data.global.x;
      verts[7] = event.data.global.y;
      ship.dirty = true;
    };

    ship.on("mousemove", touchMove);
    ship.on("touchmove", touchMove);
    ship.interactive = true;
    stage.addChild(ship);

    animate();

    function animate() {
      requestAnimationFrame(animate);

      renderer.render(stage);
    }
  }
}
