// @flow
import type {PlayerId} from "gbraver-burst-core";
import * as THREE from "three";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";

/**
 * 3Dレイヤー アームドーザ固有のオブジェクトを集めたもの
 */
export interface TDArmdozerObjects {
  /** プレイヤーID */
  playerId: PlayerId;

  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * アームドーザスプライトにダウンキャストする
   *
   * @return アームドーザスプライト
   */
  sprite(): ArmDozerSprite;

  // TODO 削除する
  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[];

  // TODO 削除する
  /**
   * アームドーザスプライト配下に置かれるオブジェクトを取得する
   *
   * @return アームドーザスプライト配下に置かれるオブジェクト
   */
  getUnderSprite(): typeof THREE.Object3D[];
}