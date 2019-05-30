// @flow

import * as THREE from "three";
import {Animate} from "../../animation/animate";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /** ノックバック */
  knockBack(): Animate;

  /** ノックバック -> 立ちポーズ */
  knockBackToStand(): Animate;

  /** ガード */
  guard(): Animate;

  /** ガード -> 立ちポーズ */
  guardToStand(): Animate;

  /** 避け */
  avoid(): Animate;

  /** 避け -> 立ち */
  avoidToStand(): Animate;
}