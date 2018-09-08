// @flow

import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import * as THREE from 'three';

/** ダメージインジケータのビュー*/
export interface DamageIndicatorView {
  engage(model: DamageIndicatorModel): void;
  getObject3D(): THREE.Object3D;
}