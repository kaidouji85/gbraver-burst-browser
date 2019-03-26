// @flow

import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import * as THREE from "three";

/** メッシュサイズ */
const MESH_SIZE = 256;

// TODO 当たり判定を追加する
/** マイナスバッテリー */
export class BatteryMinus {
  _mesh: SimpleImageMesh;

  constructor(resources: Resources) {
    const imageResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_MINUS);
    const image = imageResource
      ? imageResource.image
      : new Image();

    this._mesh = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: image
    });
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }
}