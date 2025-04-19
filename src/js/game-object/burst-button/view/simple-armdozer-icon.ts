import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TextureId } from "../../../resource/texture/resource";
import { ArmdozerIcon } from "./armdozer-icon";

/** オプション */
type Options = ResourcesContainer & {
  /** メッシュの大きさ */
  size: number;
  /** ローカル座標 x */
  x: number;
  /** ローカル座標 y */
  y: number;
  /** テクスチャID */
  textureId: TextureId;
};

/** シンプルなバーストボタンの実装 */
export class SimpleArmdozerIcon implements ArmdozerIcon {
  /** メッシュ */
  #mesh: HorizontalAnimationMesh;
  /** グループ */
  #group: THREE.Group;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: Options) {
    const { resources, size, x, y, textureId } = options;
    this.#group = new THREE.Group();
    const { texture } = findTextureOrThrow(resources, textureId);
    this.#mesh = new HorizontalAnimationMesh({
      texture: texture,
      maxAnimation: 1,
      width: size,
      height: size,
    });
    this.#mesh.animate(1);
    this.#mesh.getObject3D().position.x = x;
    this.#mesh.getObject3D().position.y = y;
    this.#group.add(this.#mesh.getObject3D());
  }

  /** @override */
  destructor(): void {
    this.#mesh.destructor();
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /** @override */
  setOpacity(opacity: number): void {
    this.#mesh.opacity(opacity);
  }
}
