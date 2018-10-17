// @flow

import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import * as THREE from 'three';

/** ダメージインジケータのビュー*/
export interface DamageIndicatorView {
  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void;

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;
}