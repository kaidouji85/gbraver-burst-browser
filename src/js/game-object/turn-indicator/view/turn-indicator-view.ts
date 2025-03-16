import * as THREE from "three";

import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import type { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import {
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../td-position";
import type { TurnIndicatorModel } from "../model/turn-indicator-model";

/** ターンインジケータービュー */
export class TurnIndicatorView {
  #mesh: SimpleImageMesh;

  constructor(resources: Resources) {
    const turnIndicator =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.TURN_INDICATOR,
      )?.image ?? new Image();
    this.#mesh = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 200,
      image: turnIndicator,
      imageWidth: 512,
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.#mesh.destructor();
  }

  /** モデルをビューに反映させる */
  engage(model: TurnIndicatorModel): void {
    const object = this.#mesh.getObject3D();
    const scale = model.animation * 0.3 + 0.7;
    object.scale.x = model.isPlayerTurn ? scale : -scale;
    object.scale.y = scale;
    const x = 40 - 60 * model.animation;
    object.position.x = model.isPlayerTurn ? x : -x;
    object.position.y = ARMDOZER_EFFECT_STANDARD_Y;
    object.position.z = ARMDOZER_EFFECT_STANDARD_Z + 20;
    this.#mesh.setOpacity(model.opacity);
  }

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void {
    this.#mesh.getObject3D().quaternion.copy(camera.quaternion);
  }

  /** ビューで使うthree.jsを返す */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }
}
