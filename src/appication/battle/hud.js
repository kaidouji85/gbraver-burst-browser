// @flow
import ThreeLib from 'three-js';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

/**
 * キャンバスからMeshを生成する
 *
 * @param canvas キャンバス
 * @return キャンバスメッシュ
 */
function CanvasMesh(canvas: HTMLCanvasElement): THREE.Mesh {
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial( {map: texture } );
  material.transparent = true;

  var planeGeometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
  return new THREE.Mesh( planeGeometry, material );
}

/** Head Up Display(HUD)のレイヤー */
export default class Hud {
  /** レンダラー */
  rendeer: THREE.WebGLRenderer;

  /** 本レイヤーのベースとなるシーン */
  scene: THREE.Scene;

  /** 本レイヤーのカメラ */
  camera: THREE.OrthographicCamera;

  /** ベースとなるキャンバス */
  canvas: HTMLCanvasElement;

  /** キャンバスから生成した2D描画コンテクスト */
  contextOf2D: CanvasRenderingContext2D;

  /** キャンバスから生成したメッシュ */
  canvasMesh: THREE.Mesh;

  constructor(props: {renderer: THREE.WebGLRenderer}) {
    this.rendeer = props.renderer;

    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(
      -window.innerWidth/2,
      window.innerWidth/2,
      window.innerHeight/2,
      -window.innerHeight/2,
      0,
      30
    );

    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.contextOf2D = this.canvas.getContext('2d');
    this.contextOf2D.font = "Normal 40px Arial";
    this.contextOf2D.textAlign = 'center';
    this.contextOf2D.fillStyle = "rgba(245,245,245,0.75)";

    this.canvasMesh = CanvasMesh(this.canvas);
    this.scene.add(this.canvasMesh);
  }

  /** ゲームループでの処理 */
  animate() {
    this.contextOf2D.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.contextOf2D.fillText('HUD Display', window.innerWidth / 2, window.innerHeight / 2);

    this.rendeer.render(this.scene, this.camera);
  }

  /** リサイズ時の処理 */
  resize() {
    this.camera.left = -window.innerWidth/2;
    this.camera.right = window.innerWidth/2;
    this.camera.top = window.innerHeight/2;
    this.camera.bottom = -window.innerHeight/2;
    this.camera.updateProjectionMatrix();
  }

}