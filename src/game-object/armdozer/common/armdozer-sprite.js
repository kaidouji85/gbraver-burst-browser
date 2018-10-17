// @flow

import * as THREE from "three";
import {Tween} from '@tweenjs/tween.js';

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /** 立ちポーズのアニメを開始する */
  stand(): void;
}
