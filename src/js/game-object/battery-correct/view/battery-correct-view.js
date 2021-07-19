// @flow

import * as THREE from 'three';
import type {BatteryCorrectModel} from "../model/battery-correct-model";
import type {PreRender} from "../../../game-loop/pre-render";

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
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}
