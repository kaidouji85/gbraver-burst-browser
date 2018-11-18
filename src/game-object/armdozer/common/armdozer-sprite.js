// @flow

import * as THREE from "three";
import {Tween} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../animation/tween-animation";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /** 立ちポーズにする */
  stand(): TweenAnimation;

  /** 敵との距離を詰める */
  frontStep(): TweenAnimation;

  /** 敵との距離を離す */
  backStep(): TweenAnimation;

  /** パンチのアニメーションを再生する */
  punch(): TweenAnimation;

  /** ダメージアニメーションを再生する */
  damage(): TweenAnimation;

  /** パンチをしてから攻撃がヒットするまでの時間 */
  punchHitDuration(): number;
}