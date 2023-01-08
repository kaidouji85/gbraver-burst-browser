import * as THREE from "three";

import type { DamageIndicatorModel } from "../model/damage-indicator-model";

/** ダメージインジケータのビュー*/
export interface DamageIndicatorView {
  /** デストラクタ */
  destructor(): void;

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void;

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void;

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;
}