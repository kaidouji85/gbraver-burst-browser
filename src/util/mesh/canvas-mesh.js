import * as THREE from "three";
import type {Resources} from "../../resource/resource-manager";

/**
 * キャンバスから平面メッシュを生成する
 *
 * @param canvas キャンバス
 * @param width 幅
 * @param height 高
 * @return キャンバスから生成したメッシュ
 */
export function createCanvasMesh(canvas: HTMLCanvasElement, width: number, height: number) {
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial({map: texture});
  material.transparent = true;

  const planeGeometry = new THREE.PlaneGeometry(width, height);
  return new THREE.Mesh(planeGeometry, material);
}

/**
 * キャンバスメッシュおよび関連オブジェクトを集めたクラス
 */
export class CanvasMesh {
  /** リソース管理クラス */
  resources: Resources;
  /** メッシュ */
  mesh: THREE.Mesh;
  /** メッシュ幅 */
  meshWidth: number;
  /** メッシュ高 */
  meshHeight: number;
  /** 描画を行うキャンバス */
  canvas: HTMLCanvasElement;

  constructor(props: {
    resources: Resources,
    canvasWidth: number,
    canvasHeight: number,
    meshWidth: number,
    meshHeight: number,
  }) {
    this.resources = props.resources;

    this.canvas = document.createElement('canvas');
    this.canvas.width = props.canvasWidth;
    this.canvas.height = props.canvasHeight;

    this.meshWidth = props.meshWidth;
    this.meshHeight = props.meshHeight;
    this.mesh = createCanvasMesh(this.canvas, this.meshWidth, this.meshHeight);
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return [this.mesh];
  }
}