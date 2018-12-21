// @flow

import * as THREE from "three";
import {Animate} from "../../animation/animate";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /** 立ちポーズにする */
  stand(): Animate;

  /** 攻撃をする */
  attack(): Animate;

  /** ノックバックアニメーションを再生する */
  knockBack(): Animate;

  /** ノックバックから立ちに戻る */
  recoverKnockBack(): Animate;

  /** パンチをしてから攻撃がヒットするまでの時間 */
  punchHitDuration(): number;
}