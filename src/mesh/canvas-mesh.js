import * as THREE from "three";
import type {Resources} from "../../resource/resource-manager";

/** プロパティ */
type Props = {
  resources: Resources,
  canvasWidth: number,
  canvasHeight: number,
  meshWidth: number,
  meshHeight: number,
};

/**
 * キャンバスメッシュおよび関連オブジェクトを集めたクラス
 */
export class CanvasMesh {
  // TODO 削除する
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

  constructor(props: Props) {
    this.resources = props.resources;

    this.canvas = document.createElement('canvas');
    this.canvas.width = props.canvasWidth;
    this.canvas.height = props.canvasHeight;

    this.meshWidth = props.meshWidth;
    this.meshHeight = props.meshHeight;
    const texture = new THREE.Texture(this.canvas);
    const material = new THREE.MeshBasicMaterial({map: texture});
    material.transparent = true;
    const planeGeometry = new THREE.PlaneGeometry(this.meshWidth, this.meshHeight);
    this.mesh = new THREE.Mesh(planeGeometry, material);
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return [this.mesh];
  }

  /**
   * キャンバステクスチャに描画するヘルパー関数
   *
   * @param drawFunc 描画関数
   */
  draw(drawFunc: (context: CanvasRenderingContext2D) => void): void {
    // テクスチャとして使われているキャンバスを更新する場合、
    // 毎回 mesh.material.map.needsUpdate = true とセットする必要がある
    //
    // 詳細
    // https://stackoverflow.com/a/18474767/7808745
    this.mesh.material.map.needsUpdate = true;

    const context = this.canvas.getContext('2d');
    drawFunc(context);
  }
}