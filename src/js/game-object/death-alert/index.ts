import * as THREE from "three";

import { ResourcesContainer } from "../../resource";
import { createDeathAlertProps } from "./props/create-death-alert-props";
import { DeathAlertProps } from "./props/death-alert-props";

/** デスアラート */
export class DeathAlert {
  /** プロパティ */
  #props: DeathAlertProps;

  /**
   * コンストラクタ
   * @param options オプション
   * @param options.resources リソース管理オブジェクト
   */
  constructor(options: ResourcesContainer) {
    this.#props = createDeathAlertProps(options);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
  }

  /**
   * シーンに追加するための THREE.Object3D を取得する
   * @returns シーンに追加するための THREE.Object3D
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }
}
