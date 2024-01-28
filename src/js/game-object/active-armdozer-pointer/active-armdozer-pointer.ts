import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../mesh/horizontal-animation";
import { Resources } from "../../resource";
import { TEXTURE_IDS } from "../../resource/texture/ids";

/** アクティブアームドーザポインター */
export class ActiveArmdozerPointer {
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

  /**
   * シーンに追加するオブジェクトを返す
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }
}
