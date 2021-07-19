// @flow

import * as THREE from 'three';
import type {BatteryCorrectModel} from "../model/battery-correct-model";

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
   */
  engage(model: BatteryCorrectModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}
