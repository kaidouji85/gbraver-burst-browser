import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { HUD_CUT_IN_ZNIDEX } from "../../../hud-zindex";
import { HUDCutInScale } from "../../../scale";
import type {
  AnimationType,
  LightningDozerCutInModel,
} from "../model/lightning-dozer-cutin-model";
import type { LightningDozerCutInView } from "./lightning-dozer-cutin-view";

/** メッシュの大きさ */
export const MESH_SIZE = 900;

/** ベースとなるpadding top */
export const BASE_PADDING_TOP = 60;

/**
 * プレイヤー ライトニングドーザ カットイン
 */
export class PlayerLightningDozerCutInView implements LightningDozerCutInView {
  #group: THREE.Group;
  #cutInUp: HorizontalAnimationMesh;
  #cutInDown: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const cutInUpResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_UP,
    );
    const cutInUp = cutInUpResource
      ? cutInUpResource.texture
      : new THREE.Texture();
    this.#cutInUp = new HorizontalAnimationMesh({
      texture: cutInUp,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4,
    });
    const cutInDownResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_DOWN,
    );
    const cutInDown = cutInDownResource
      ? cutInDownResource.texture
      : new THREE.Texture();
    this.#cutInDown = new HorizontalAnimationMesh({
      texture: cutInDown,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4,
    });
    this.#getMeshes().forEach((mesh) => {
      this.#group.add(mesh.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#getMeshes().forEach((mesh) => {
      mesh.destructor();
    });
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender PreRender情報
   */
  engage(model: LightningDozerCutInModel, preRender: PreRender): void {
    const activeMesh = this.#getActiveMesh(model.animation.type);
    activeMesh.animate(model.animation.frame);
    activeMesh.setOpacity(model.opacity);
    const disActiveMeshes = this.#getMeshes().filter((v) => v !== activeMesh);
    disActiveMeshes.forEach((v) => {
      v.setOpacity(0);
    });
    const scale =
      HUDCutInScale(preRender.rendererDOM, preRender.safeAreaInset) *
      model.scale;
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = model.tracking.y - BASE_PADDING_TOP * scale;
    this.#group.position.z = HUD_CUT_IN_ZNIDEX;
    this.#group.scale.x = scale;
    this.#group.scale.y = scale;
    this.#group.scale.z = scale;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * 本クラスに含まれる全メッシュを取得する
   *
   * @return 取得結果
   */
  #getMeshes(): HorizontalAnimationMesh[] {
    return [this.#cutInUp, this.#cutInDown];
  }

  /**
   * アニメーションタイプに対応したメッシュを返す
   *
   * @param type アニメーションタイプ
   * @return 対応したメッシュ
   */
  #getActiveMesh(type: AnimationType): HorizontalAnimationMesh {
    switch (type) {
      case "CUT_IN_UP":
        return this.#cutInUp;

      case "CUT_IN_DOWN":
        return this.#cutInDown;

      default:
        return this.#cutInDown;
    }
  }
}
