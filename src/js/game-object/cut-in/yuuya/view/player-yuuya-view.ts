import * as THREE from "three";

import { PreRender } from "../../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { Resources } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { HUD_CUT_IN_Z } from "../../../hud-position";
import { hudScale } from "../../../scale";
import { YuuyaModel } from "../model/yuuya-model";
import { YuuyaView } from "./yuuya-view";

/** メッシュの大きさ */
export const MESH_SIZE = 550;

/** アニメーション数 */
export const MAX_ANIMATION = 1;

/** 右パディング */
export const PADDING_RIGHT = 200;

/** 上パディング */
export const PADDING_TOP = 20;

/** プレイヤー側 ユウヤ ビュー */
export class PlayerYuuyaView implements YuuyaView {
  #mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const { texture } = findTextureOrThrow(resources, TEXTURE_IDS.YUUYA_CUTIN);
    this.#mesh = new HorizontalAnimationMesh({
      texture,
      maxAnimation: MAX_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /** @override */
  destructor(): void {
    this.#mesh.destructor();
  }

  /** @override */
  engage(model: YuuyaModel, preRender: PreRender): void {
    const scale =
      hudScale(preRender.rendererDOM, preRender.safeAreaInset) * model.scale;
    const x =
      preRender.rendererDOM.clientWidth / 2 +
      (model.position.x - PADDING_RIGHT) * scale;
    const y = -PADDING_TOP * scale;
    this.#mesh.getObject3D().scale.set(scale, scale, scale);
    this.#mesh.getObject3D().position.set(x, y, HUD_CUT_IN_Z);
    this.#mesh.opacity(model.opacity);
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }
}
