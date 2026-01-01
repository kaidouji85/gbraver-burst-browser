import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { HUD_RESULT_INDICATOR_Z } from "../../hud-position";
import { hudScale } from "../../scale";
import { ResultIndicatorModel } from "../model/result-indicator-model";
import { ResultIndicatorView } from "./result-indicator-view";

/** メッシュの幅 */
const MESH_WIDTH = 400;
/** メッシュの高さ */
const MESH_HEIGHT = 100;

/** シンプルなビュー実装 */
export class SimpleIndicatorView implements ResultIndicatorView {
  /** メッシュ */
  #mesh: HorizontalAnimationMesh;
  /** X方向のパディング */
  #paddingX: number;
  /** Y方向のパディング */
  #paddingY: number;

  /**
   * コンストラクタ
   * @param texture 文言テクスチャ
   * @param paddingX X方向のパディング
   * @param paddingY Y方向のパディング
   */
  constructor(texture: THREE.Texture, paddingX: number, paddingY: number) {
    this.#mesh = new HorizontalAnimationMesh({
      texture,
      maxAnimation: 1,
      width: MESH_WIDTH,
      height: MESH_HEIGHT,
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
    target.position.z = HUD_RESULT_INDICATOR_Z;
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
