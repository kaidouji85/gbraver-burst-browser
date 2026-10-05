import * as THREE from "three";

import { SPRITE_RENDER_ORDER } from "../render/render-order/td-render-order";

/** パラメータ */
type Params = {
  canvasWidth: number;
  canvasHeight: number;
  meshWidth: number;
  meshHeight: number;
};

/** キャンバスメッシュおよび関連オブジェクトを集めたクラス */
export class CanvasMesh {
  /** メッシュ */
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

  /** テクスチャ  */
  texture: THREE.Texture;

  /**
   * 描画を行うキャンバス
   * デストラクタでnullを指定できるようにMaybe Typesを指定した
   */
  canvas: HTMLCanvasElement | null | undefined;

  constructor(params: Params) {
    const canvas = document.createElement("canvas");
    canvas.width = params.canvasWidth;
    canvas.height = params.canvasHeight;
    this.canvas = canvas;
    this.texture = new THREE.Texture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
    });
    const planeGeometry = new THREE.PlaneGeometry(
      params.meshWidth,
      params.meshHeight,
    );
    this.mesh = new THREE.Mesh(planeGeometry, material);
    this.mesh.renderOrder = SPRITE_RENDER_ORDER;
  }

  /** デストラクタ */
  destructor(): void {
    this.mesh.geometry.dispose();
    this.texture.dispose();
    this.mesh.material.dispose();
    this.canvas = null;
  }

  /**
   * キャンバステクスチャに描画するヘルパー関数
   *
   * @param drawFunc 描画関数
   */
  draw(drawFunc: (context: CanvasRenderingContext2D) => void): void {
    if (!this.canvas) {
      return;
    }

    // テクスチャとして使われているキャンバスを更新する場合、
    // 毎回 mesh.material.map.needsUpdate = true とセットする必要がある
    //
    // 詳細
    // https://stackoverflow.com/a/18474767/7808745
    (this.mesh.material.map ?? new THREE.Texture()).needsUpdate = true;
    const context =
      this.canvas.getContext("2d") || new CanvasRenderingContext2D();
    drawFunc(context);
  }

  /** 不透明度を設定する */
  setOpacity(opacity: number): void {
    this.mesh.material.opacity = opacity;
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this.mesh;
  }
}
