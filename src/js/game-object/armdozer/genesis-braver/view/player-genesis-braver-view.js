// @flow

import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import type { GenesisBraverView } from "./genesis-braver-view";

/** スプライト幅 */
export const WIDTH = 600;
/** スプライト高 */
export const HEIGHT = 600;

/** プレイヤー ジェネシスブレイバービュー */
export class PlayerGenesisBraverView implements GenesisBraverView {
  /** 立ち */
  #sprite: ArmdozerAnimation;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const texture =
      resources.textures.find((v) => v.id === TEXTURE_IDS.GENESIS_BRAVER_STAND)
        ?.texture ?? new THREE.Texture();
    this.#sprite = createHorizontalAnimation({
      texture,
      maxAnimation: 1,
      width: WIDTH,
      height: HEIGHT,
    });
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#sprite.getObject3D();
  }

  /** @override */
  lookAt(camera: typeof THREE.Camera): void {
    this.#sprite.getObject3D().quaternion.copy(camera.quaternion);
  }
}
