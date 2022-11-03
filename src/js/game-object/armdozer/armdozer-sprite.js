// @flow

import * as THREE from "three";

import { Animate } from "../../animation/animate";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): typeof THREE.Object3D;

  /**
   * スプライト配下のオブジェクトを追加する
   * @param object オブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void;

  /**
   * ノックバック
   * @return アニメーション
   */
  knockBack(): Animate;

  /**
   * ノックバック -> 立ちポーズ
   * @return アニメーション
   */
  knockBackToStand(): Animate;

  /**
   * ガード
   * @return アニメーション
   */
  guard(): Animate;

  /**
   * ガード -> 立ちポーズ
   * @return アニメーション
   */
  guardToStand(): Animate;

  /**
   * 避け
   * @return アニメーション
   */
  avoid(): Animate;

  /**
   * 避け -> 立ち
   * @return アニメーション
   */
  avoidToStand(): Animate;

  /**
   * ダウン
   * @return アニメーション
   */
  down(): Animate;
}
