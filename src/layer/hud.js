// @flow
import ThreeLib from 'three-js';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

const width = window.innerWidth;
const height = window.innerHeight;

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

  var planeGeometry = new THREE.PlaneGeometry( width, height );
  return new THREE.Mesh( planeGeometry, material );
}

/** Head Up Display(HUD)のレイヤー */
export default class Hud {
  /** 本レイヤーのベースとなるシーン */
  scene: THREE.Scene;

  /** 本レイヤーのカメラ */
  camera: THREE.Camera;

  /** ベースとなるキャンバス */
  canvas: HTMLCanvasElement;

  /** キャンバスから生成した2D描画コンテクスト */
  contextOf2D: CanvasRenderingContext2D;

  /** キャンバスから生成したメッシュ */
  canvasMesh: THREE.Mesh;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(
      -width/2, width/2,
      height/2, -height/2,
      0, 30
    );

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.contextOf2D = this.canvas.getContext('2d');
    this.contextOf2D.font = "Normal 40px Arial";
    this.contextOf2D.textAlign = 'center';
    this.contextOf2D.fillStyle = "rgba(245,245,245,0.75)";
    this.contextOf2D.fillText('Initializing...', width / 2, height / 2);

    this.canvasMesh = CanvasMesh(this.canvas);
    this.scene.add(this.canvasMesh);
  }

  /** ゲームループでの処理 */
  animate() {
    this.contextOf2D.clearRect(0, 0, width, height);
    this.contextOf2D.fillText('Initializing...', width / 2, height / 2);
  }

}