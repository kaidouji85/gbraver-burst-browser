// @flow
import * as THREE from 'three';

/**
 * キャンバスから平面メッシュを生成する
 *
 * @param canvas キャンバス
 * @param width 幅
 * @param height 高
 * @return キャンバスから生成したメッシュ
 */
function createCanvasMesh(canvas: HTMLCanvasElement) {
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial( {map: texture } );
  material.transparent = true;

  var planeGeometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
  return new THREE.Mesh(planeGeometry, material);
}

/**
 * 画面全体がキャンバスになっているthree.jsのシーン
 * キャンバス系メソッドのスタブに使用する
 */
export class CanvasScene {
  /** レンダラー */
  renderer: THREE.WebGLRenderer;
  /** 本レイヤーのベースとなるシーン */
  scene: THREE.Scene;
  /** 本レイヤーのカメラ */
  camera: THREE.OrthographicCamera;
  /** メッシュ */
  mesh: THREE.Mesh;
  /** 描画対象となるキャンバス */
  canvas: HTMLCanvasElement;

  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.autoClear = false;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

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

    this.mesh = createCanvasMesh(this.canvas);
    this.scene.add(this.mesh);
  }

  /** レンダリングを実行する */
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}