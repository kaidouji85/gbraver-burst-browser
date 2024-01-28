import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { ActiveArmdozerPointerModel } from "../model/active-armdozer-pointer-model";
import { ActiveArmdozerPointerView } from "./active-armdozer-pointer-view";

/** プレイヤー側 アクティブアームドーザポインター ビュー */
export class PlayerArmdozerPointerView implements ActiveArmdozerPointerView {
  /** メッシュ */
  #mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const texture =
      resources.textures.find(
        (v) => v.id === TEXTURE_IDS.ACTIVE_ARMDOZER_POINTER,
      )?.texture ?? new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture,
      maxAnimation: 1,
      width: 100,
      height: 100,
    });
  }

  /** @override */
  destructor() {
    this.#mesh.destructor();
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }

  /** @override */
  engage(model: ActiveArmdozerPointerModel) {
    this.#mesh.opacity(model.opacity);
    this.#mesh.getObject3D().position.x = model.position.x;
    this.#mesh.getObject3D().position.y = model.position.y;
    this.#mesh.getObject3D().rotation.z = Math.PI / 4;
  }
}
