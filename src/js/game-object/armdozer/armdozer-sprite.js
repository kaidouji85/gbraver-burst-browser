// @flow

import * as THREE from "three";
import {Animate} from "../../animation/animate";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** デストラクタ */
  destructor(): void;

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D;

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void;

  // TODO 削除する
  /** ターンスタート */
  turnStart(): Animate;

  // TODO 削除する
  /** ターンスタート -> 立ち */
  turnStartToStand(): Animate;

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