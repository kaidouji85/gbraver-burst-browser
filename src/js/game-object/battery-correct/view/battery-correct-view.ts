import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import type { BatteryCorrectModel } from "../model/battery-correct-model";

/** バッテリー補正ビュー */
export interface BatteryCorrectView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /***
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: BatteryCorrectModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
