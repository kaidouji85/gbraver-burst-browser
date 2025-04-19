import * as THREE from "three";

import { PreRender } from "../../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { Resources } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { HUD_CUT_IN_Z } from "../../../hud-position";
import { hudScale } from "../../../scale";
import {
  AnimationType,
  NeoLandozerCutInModel,
} from "../model/neo-landozer-cutin-model";
import { NeoLandozerCutInView } from "./neo-landozer-cutin-view";

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;
/** 幅 */
export const WIDTH = 800;
/** 高 */
export const HEIGHT = 800;

/** プレイヤー側 ネオランドーザ カットイン ビュー */
export class PlayerNeoLandozerCutInView implements NeoLandozerCutInView {
  #group: THREE.Group;
  #cutInUp: HorizontalAnimationMesh;
  #cutInDown: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#group.position.z = HUD_CUT_IN_Z;
    const cutInUp = findTextureOrThrow(
      resources,
      TEXTURE_IDS.NEO_LANDOZER_CUTIN_UP,
    ).texture;
    this.#cutInUp = new HorizontalAnimationMesh({
      texture: cutInUp,
      maxAnimation: MAX_ANIMATION,
      width: WIDTH,
      height: HEIGHT,
    });
    const cutInDown = findTextureOrThrow(
      resources,
      TEXTURE_IDS.NEO_LANDOZER_CUTIN_DOWN,
    ).texture;
    this.#cutInDown = new HorizontalAnimationMesh({
      texture: cutInDown,
      maxAnimation: MAX_ANIMATION,
      width: WIDTH,
      height: HEIGHT,
    });
    this.#getAllMeshes().forEach((v) => {
      this.#group.add(v.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#getAllMeshes().forEach((v) => {
      v.destructor();
    });
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: NeoLandozerCutInModel, preRender: PreRender): void {
    const activeMesh = this.#getActiveMesh(model.animation.type);
    activeMesh.opacity(model.opacity);
    activeMesh.animate(model.animation.frame);
    this.#getAllMeshes()
      .filter((v) => v !== activeMesh)
      .forEach((v) => {
        v.opacity(0);
      });
    const scale =
      model.scale * hudScale(preRender.rendererDOM, preRender.safeAreaInset);
    this.#group.scale.set(scale, scale, scale);
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = model.tracking.y;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * 本クラスの全メッシュを取得する
   *
   * @returns 本クラスの全メッシュ
   */
  #getAllMeshes(): HorizontalAnimationMesh[] {
    return [this.#cutInUp, this.#cutInDown];
  }

  /**
   * アニメーションタイプに対応したメッシュを返す
   *
   * @param type アニメーションタイプ
   * @returns 対応するメッシュ
   */
  #getActiveMesh(type: AnimationType): HorizontalAnimationMesh {
    switch (type) {
      case "CUT_IN_DOWN":
        return this.#cutInDown;

      case "CUT_IN_UP":
      default:
        return this.#cutInUp;
    }
  }
}
