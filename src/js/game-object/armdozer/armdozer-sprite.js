// @flow

import * as THREE from "three";
import {Animate} from "../../animation/animate";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** デストラクタ */
  destructor(): void;

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /** ターンスタート */
  turnStart(): Animate;

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

  /** ダウン */
  down(): Animate;
}