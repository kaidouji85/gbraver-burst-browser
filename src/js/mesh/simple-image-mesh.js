// @flow

import * as THREE from 'three';
import {CanvasMesh} from "./canvas-mesh";
import {drawImageInCenter} from "../canvas/draw/image-drawer";

/** コンストラクタのパラメータ */
type Param = {
  /** キャンバスの縦、横をピクセル単位で指定する */
  canvasSize: number,
  /** メッシュの大きさ */
  meshSize: number,
  /** 画像データ */
  image: Image,
  /**
   * 画像の横幅をピクセル単位で指定する
   * 本パラメータを指定しなかった場合、画像本来の横幅を使用する
   * 縦幅はオリジナル画像のアスペクト比を維持するように自動計算される
   */
  imageWidth?: number,
};

/** 単一のImageをメッシュ化したもの */
export class SimpleImageMesh {
  _mesh: CanvasMesh;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this._mesh = new CanvasMesh({
      canvasWidth: param.canvasSize,
      canvasHeight: param.canvasSize,
      meshWidth: param.meshSize,
      meshHeight: param.meshSize,
    });
    this._mesh.draw(context => {
      const dx = context.canvas.width / 2;
      const dy = context.canvas.height / 2;
      drawImageInCenter(context, param.image, dx, dy, param.imageWidth);
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._mesh.destructor();
  }

  /** 透明度を設定する */
  setOpacity(opacity: number): void {
    this._mesh.setOpacity(opacity);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._mesh.mesh;
  }
}