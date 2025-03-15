import * as THREE from "three";

import { ResourcesContainer } from "../../../resource";
import { createLightningShotProps } from "./procedures/create-lightning-shot-props";
import { LightningShotProps } from "./props";

/** 電撃ショット */
export class LightningShot {
  /** プロパティ */
  #props: LightningShotProps;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: ResourcesContainer) {
    this.#props = createLightningShotProps(options);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.mesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.mesh.getObject3D();
  }
}
