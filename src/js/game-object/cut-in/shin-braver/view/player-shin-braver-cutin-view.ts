import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { HUD_CUT_IN_Z } from "../../../hud-position";
import { hudScale } from "../../../scale";
import type {
  AnimationType,
  ShinBraverCutInModel,
} from "../model/shin-braver-cutin-model";
import type { ShinBraverCutInView } from "./shin-braver-cutin-view";

/** メッシュの大きさ */
export const MESH_SIZE = 800;

/** ベースとなるpadding top */
export const BASE_PADDING_TOP = 100;

/**
 * プレイヤー側 シンブレイバーカットインのビュー
 */
export class PlayerShinBraverCutInView implements ShinBraverCutInView {
  #group: THREE.Group;
  #cutInUp: HorizontalAnimationMesh;
  #cutInDown: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const cutInUpResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.SHIN_BRAVER_CUTIN_UP,
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
      (v) => v.id === TEXTURE_IDS.SHIN_BRAVER_CUTIN_DOWN,
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
    this.#getMeshes().forEach((v) => {
      this.#group.add(v.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#getMeshes().forEach((v) => {
      v.destructor();
    });
  }

  /**
   * モデルをビューに反映させる
   * 本メソッドはプリレンダー時に呼ばれることを想定している
   *
   * @param model モデル
   * @param preRender プリレンダーのアクション
   */
  engage(model: ShinBraverCutInModel, preRender: PreRender): void {
    const activeMesh = this.#getActiveMesh(model.animation.type);
    activeMesh.animate(model.animation.frame);
    activeMesh.opacity(model.opacity);
    const disActiveMeshes = this.#getMeshes().filter((v) => v !== activeMesh);
    disActiveMeshes.forEach((v) => {
      v.opacity(0);
    });
    const scale =
      hudScale(preRender.rendererDOM, preRender.safeAreaInset) * model.scale;
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = model.tracking.y - BASE_PADDING_TOP * scale;
    this.#group.position.z = HUD_CUT_IN_Z;
    this.#group.scale.x = scale;
    this.#group.scale.y = scale;
    this.#group.scale.z = scale;
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
   * 本クラスが管理する全メッシュを取得する
   *
   * @returns 管理する全メッシュ
   */
  #getMeshes(): HorizontalAnimationMesh[] {
    return [this.#cutInUp, this.#cutInDown];
  }

  /**
   * 指定したアニメーションタイプに対応したメッシュを返す
   *
   * @param type アニメーションタイプ
   * @returns メッシュ
   */
  #getActiveMesh(type: AnimationType): HorizontalAnimationMesh {
    switch (type) {
      case "CUT_IN_UP":
        return this.#cutInUp;

      case "CUT_IN_DOWN":
      default:
        return this.#cutInDown;
    }
  }
}
