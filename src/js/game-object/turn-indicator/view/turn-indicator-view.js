// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource";
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {ARMDOZER_EFFECT_STANDARD_Y, ARMDOZER_EFFECT_STANDARD_Z} from "../../armdozer/position";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";

/** ターンインジケータービュー */
export class TurnIndicatorView {
  _mesh: SimpleImageMesh;

  constructor(resources: Resources) {
    const turnIndicator = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.TURN_INDICATOR)?.image ?? new Image();
    this._mesh = new SimpleImageMesh({canvasSize: 512, meshSize: 200, image: turnIndicator, imageWidth: 512});
  }

  /** デストラクタ */
  destructor(): void {
    this._mesh.destructor();
  }

  /** モデルをビューに反映させる */
  engage(model: TurnIndicatorModel): void {
    const object = this._mesh.getObject3D();

    const scale = (model.animation * 0.3 + 0.7);
    object.scale.x = model.isPlayerTurn ? scale : -scale;
    object.scale.y = scale;

    const x = 40 - 60 * model.animation;
    object.position.x = model.isPlayerTurn ? x : -x;
    object.position.y = ARMDOZER_EFFECT_STANDARD_Y;
    object.position.z = ARMDOZER_EFFECT_STANDARD_Z + 20;

    this._mesh.setOpacity(model.opacity);
  }

  /** カメラの方向を向く */
  lookAt(camera: typeof THREE.Camera): void {
    this._mesh.getObject3D().quaternion.copy(camera.quaternion);
  }

  /** ビューで使うthree.jsを返す */
  getObject3D(): typeof THREE.Object3D {
    return this._mesh.getObject3D();
  }
}
