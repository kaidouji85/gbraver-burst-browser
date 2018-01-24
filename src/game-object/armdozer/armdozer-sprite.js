// @flow

import * as THREE from "three";
import {Tween} from '@tweenjs/tween.js';

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** ゲームループでの処理 */
  gameLoop(time: DOMHighResTimeStamp, camera: THREE.Camera): void;

  /** シーンに追加するオブジェクトを取得する */
  getThreeJsObjects(): THREE.Object3D[];

  /** 立ちポーズのアニメを開始する */
  stand(): Tween;

  /** 本オブジェクトに関連するTweenを全削除する */
  removeTween(): void;
}
