import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { PilotIcon } from "./pilot-icon";

/**
 * ライト パイロットアイコン
 */
export class RaitoIcon implements PilotIcon {
  #group: THREE.Group;
  #mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const texture =
      resources.textures.find((v) => v.id === TEXTURE_IDS.RAITO_CUTIN)
        ?.texture ?? new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture: texture,
      maxAnimation: 1,
      width: 400,
      height: 400,
    });
    this.#mesh.getObject3D().position.x = -10;
    this.#mesh.getObject3D().position.y = 140;
    this.#group.add(this.#mesh.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#mesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * 不透明度を設定する
   *
   * @param opacity 不透明度
   */
  setOpacity(opacity: number): void {
    this.#mesh.opacity(opacity);
  }
}
