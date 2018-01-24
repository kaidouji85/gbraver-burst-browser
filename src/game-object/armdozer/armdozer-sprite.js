// @flow

import * as THREE from "three";
import {Tween} from '@tweenjs/tween.js';

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** ゲームループでの処理 */
  gameLoop(camera: THREE.Camera, time: DOMHighResTimeStamp): void;
  /** シーンに追加するオブジェクトを取得する */
  getThreeJsObjects(): THREE.Object3D[];
  /** 立ちポーズのアニメを開始する */
  stand(): Tween;
}
