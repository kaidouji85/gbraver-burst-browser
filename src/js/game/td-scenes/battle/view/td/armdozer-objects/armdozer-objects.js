import type {PlayerId} from "gbraver-burst-core";
import * as THREE from "three";

/**
 * 3Dレイヤー アームドーザ固有のオブジェクトを集めたもの
 */
export interface TDArmdozerObjects {
  /** プレイヤーID */
  playerId: PlayerId;

  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];

  /**
   * アームドーザスプライト配下に置かれるオブジェクトを取得する
   *
   * @return アームドーザスプライト配下に置かれるオブジェクト
   */
  getUnderSprite(): THREE.Object3D[];
}