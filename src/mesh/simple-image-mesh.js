// @flow

import * as THREE from 'three';
import {CanvasMesh} from "./canvas-mesh";
import {drawImageInCenter} from "../canvas/draw/image-drawer";

type Param = {
  canvasSize: number,
  image: Image,
};

/** 単一のImageをメッシュ化したもの */
export class SimpleImageMesh {
  _mesh: CanvasMesh;

  constructor(param: Param) {
    this._mesh = new CanvasMesh({
      canvasWidth: param.canvasSize,
      canvasHeight: param.canvasSize,
      meshWidth: param.canvasSize,
      meshHeight: param.canvasSize,
    });
    this._mesh.draw(context => {
      const dx = context.canvas.width / 2;
      const dy = context.canvas.height / 2;
      drawImageInCenter(context, param.image, dx, dy);
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
  getObject3D(): THREE.Object3D {
    return this._mesh.mesh;
  }
}