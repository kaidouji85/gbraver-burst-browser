import * as THREE from "three";

/** dispose時にキャンバスも同時に廃棄するテクスチャ */
export class CanvasDisposeTexture extends THREE.Texture {
  /**
   * コンストラクタ
   * @param canvas テクスチャデータとなるキャンバス
   */
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  /** @override */
  dispose() {
    super.dispose();
  }
}
