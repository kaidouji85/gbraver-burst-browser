// @flow

import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import * as THREE from 'three';

/** ダメージインジケータのビュー*/
export interface DamageIndicatorView {
  /** デストラクタ */
  destructor(): void;

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void;

  /** カメラの方向を向く */
  lookAt(camera: typeof THREE.Camera): void;

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D;
}