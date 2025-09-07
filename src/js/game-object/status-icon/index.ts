import * as THREE from "three";

import {
  createStatusIconProps,
  StatusIconPropsCreatorOptions,
} from "./props/create-status-icon-props";
import { StatusIconProps } from "./props/status-icon-props";

export type StatusIconOptions = StatusIconPropsCreatorOptions;

/** ステータスアイコン */
export class StatusIcon {
  /** ステータスアイコンプロパティ */
  #props: StatusIconProps;

  /**
   * コンストラクタ
   * @param options ステータスアイコン生成オプション
   */
  constructor(options: StatusIconOptions) {
    this.#props = createStatusIconProps(options);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }
}
