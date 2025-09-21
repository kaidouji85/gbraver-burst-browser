import * as THREE from "three";

import { StatusIconPosition } from "../../armdozer-sprite";
import { LightningDozerModel } from "../model/lightning-dozer-model";

/**
 * ライトニングドーザビュー
 */
export interface LightningDozerView {
  /** ステータスアイコンの位置（ワールド座標） */
  statusIconPosition: StatusIconPosition;

  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningDozerModel): void;

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: THREE.Object3D): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;

  /**
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void;
}
