import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { HUD_CUT_IN_Z } from "../../../hud-position";
import { hudScale } from "../../../scale";
import type { TsubasaModel } from "../model/tsubasa-model";
import type { TsubasaView } from "./tsubasa-view";

/** メッシュの大きさ */
export const MESH_SIZE = 550;

/** アニメーション数 */
export const MAX_ANIMATION = 1;

/** 右パディング */
export const PADDING_RIGHT = 200;

/**
 * プレイヤー側 ツバサ ビュー
 */
export class PlayerTsubasaView implements TsubasaView {
  #mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const tsubasa =
      resources.textures.find((v) => v.id === TEXTURE_IDS.TSUBASA_CUTIN)
        ?.texture ?? new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture: tsubasa,
      maxAnimation: MAX_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#mesh.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: TsubasaModel, preRender: PreRender): void {
    const scale =
      hudScale(preRender.rendererDOM, preRender.safeAreaInset) * model.scale;
    const x =
      preRender.rendererDOM.clientWidth / 2 +
      (model.position.x - PADDING_RIGHT) * scale;
    this.#mesh.getObject3D().scale.set(scale, scale, scale);
    this.#mesh.getObject3D().position.set(x, 0, HUD_CUT_IN_Z);
    this.#mesh.opacity(model.opacity);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }
}
