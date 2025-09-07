import * as THREE from "three";

import { Animate } from "../../animation/animate";

/** アームドーザスプライト */
export interface ArmdozerSprite {
  /** ステータスアイコンの位置（ワールド座標） */
  statusIconPosition: {
    /** x軸 */
    x: number;
    /** y軸 */
    y: number;
    /** z軸 */
    z: number;
  };

  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;

  /**
   * スプライト配下のオブジェクトを追加する
   * @param object オブジェクト
   */
  addObject3D(object: THREE.Object3D): void;

  /**
   * アクティブ状態開始
   * @returns アニメーション
   */
  startActive(): Animate;

  /**
   * アクティブ状態終了
   * @returns アニメーション
   */
  endActive(): Animate;

  /**
   * ノックバック
   * @returns アニメーション
   */
  knockBack(): Animate;

  /**
   * ノックバック -> 立ちポーズ
   * @returns アニメーション
   */
  knockBackToStand(): Animate;

  /**
   * ガード
   * @returns アニメーション
   */
  guard(): Animate;

  /**
   * ガード -> 立ちポーズ
   * @returns アニメーション
   */
  guardToStand(): Animate;

  /**
   * 避け
   * @returns アニメーション
   */
  avoid(): Animate;

  /**
   * 避け -> 立ち
   * @returns アニメーション
   */
  avoidToStand(): Animate;

  /**
   * ダウン
   * @returns アニメーション
   */
  down(): Animate;

  /**
   * 気をつけ
   * @returns アニメーション
   */
  upright(): Animate;

  /**
   * 気をつけ -> 立ち
   * @returns アニメーション
   */
  uprightToStand(): Animate;

  /**
   * 礼（倒れる）
   * @returns アニメーション
   */
  bowDown(): Animate;

  /**
   * 礼（起き上がる）
   * @returns アニメーション
   */
  bowUp(): Animate;
}
