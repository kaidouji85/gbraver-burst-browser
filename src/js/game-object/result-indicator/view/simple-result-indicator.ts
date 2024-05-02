import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { HUD_RESULT_INDICATOR_ZINDEX } from "../../hud-zindex";
import { hudScale } from "../../scale";
import type { ResultIndicatorModel } from "../model/result-indicator-model";
import type { ResultIndicatorView } from "./result-indicator-view";

/** メッシュの大きさ */
const MESH_SIZE = 400;

/** シンプルなビュー実装 */
export class SimpleIndicatorView implements ResultIndicatorView {
  #mesh: HorizontalAnimationMesh;
  #paddingX: number;
  #paddingY: number;

  /**
   * コンストラクタ
   *
   * @param texture 文言テクスチャ
   * @param paddingX X方向のパディング
   * @param paddingY Y方向のパディング
   */
  constructor(texture: THREE.Texture, paddingX: number, paddingY: number) {
    this.#mesh = new HorizontalAnimationMesh({
      texture,
      maxAnimation: 1,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
    this.#paddingX = paddingX;
    this.#paddingY = paddingY;
  }

  /** @override */
  destructor(): void {
    this.#mesh.destructor();
  }

  /** @override */
  engage(model: ResultIndicatorModel, preRender: PreRender): void {
    const target = this.#mesh.getObject3D();
    const devicePerScale = hudScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    const safeAreaX =
      0 < model.worldCoordinate.x
        ? preRender.safeAreaInset.right
        : preRender.safeAreaInset.left;
    target.position.x =
      model.localCoordinate.x * devicePerScale +
      model.worldCoordinate.x *
        (preRender.rendererDOM.clientWidth / 2 -
          safeAreaX -
          this.#paddingX * devicePerScale);
    const safeAreaY =
      0 < model.worldCoordinate.y
        ? preRender.safeAreaInset.top
        : preRender.safeAreaInset.bottom;
    target.position.y =
      model.localCoordinate.y * devicePerScale +
      model.worldCoordinate.y *
        (preRender.rendererDOM.clientHeight / 2 -
          safeAreaY -
          this.#paddingY * devicePerScale);
    target.position.z = HUD_RESULT_INDICATOR_ZINDEX;
    target.scale.x = model.scale * devicePerScale;
    target.scale.y = model.scale * devicePerScale;
    target.quaternion.copy(preRender.camera.quaternion);
    this.#mesh.opacity(model.opacity);
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }
}
