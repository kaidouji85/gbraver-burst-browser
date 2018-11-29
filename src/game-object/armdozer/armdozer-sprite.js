// @flow

import * as THREE from "three";
import {Tween} from '@tweenjs/tween.js';
import {Animate} from "../../animation/animate";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /** 立ちポーズにする */
  stand(): Animate;

  /** 敵との距離を詰める */
  frontStep(): Animate;

  /** 敵との距離を離す */
  backStep(): Animate;

  /** パンチのアニメーションを再生する */
  punch(): Animate;

  /** ノックバックアニメーションを再生する */
  knockBack(): Animate;

  /** ノックバックから立ちに戻る */
  recoverKnockBack(): Animate;

  /** パンチをしてから攻撃がヒットするまでの時間 */
  punchHitDuration(): number;
}