// @flow

import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { HUD_CUT_IN_ZNIDEX } from "../../../hud-zindex";
import { HUDCutInScale } from "../../../scale";
import type {
  AnimationType,
  NeoLandozerCutInModel,
} from "../model/neo-landozer-cutin-model";
import type { NeoLandozerCutInView } from "./neo-landozer-cutin-view";

export const MAX_ANIMATION = 4;
export const WIDTH = 800;
export const HEIGHT = 800;

/**
 * プレイヤー側 ネオランドーザ カットイン ビュー
 */
export class PlayerNeoLandozerCutInView implements NeoLandozerCutInView {
  #group: typeof THREE.Group;
  #cutInUp: HorizontalAnimationMesh;
  #cutInDown: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#group.position.z = HUD_CUT_IN_ZNIDEX;

    const cutInUpResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.NEO_LANDOZER_CUTIN_UP
    );
    const cutInUp = cutInUpResource
      ? cutInUpResource.texture
      : new THREE.Texture();
    this.#cutInUp = new HorizontalAnimationMesh({
      texture: cutInUp,
      maxAnimation: MAX_ANIMATION,
      width: WIDTH,
      height: HEIGHT,
    });

    const cutInDownResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.NEO_LANDOZER_CUTIN_DOWN
    );
    const cutInDown = cutInDownResource
      ? cutInDownResource.texture
      : new THREE.Texture();
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
    activeMesh.setOpacity(model.opacity);
    activeMesh.animate(model.animation.frame);

    this.#getAllMeshes()
      .filter((v) => v !== activeMesh)
      .forEach((v) => {
        v.setOpacity(0);
      });

    const scale =
      model.scale *
      HUDCutInScale(preRender.rendererDOM, preRender.safeAreaInset);
    this.#group.scale.set(scale, scale, scale);
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = model.tracking.y;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /**
   * 本クラスの全メッシュを取得する
   *
   * @return 本クラスの全メッシュ
   */
  #getAllMeshes(): HorizontalAnimationMesh[] {
    return [this.#cutInUp, this.#cutInDown];
  }

  /**
   * アニメーションタイプに対応したメッシュを返す
   *
   * @param type アニメーションタイプ
   * @return 対応するメッシュ
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
