import * as THREE from "three";

import { StatusIconPosition } from "../../armdozer-sprite";
import { WingDozerModel } from "../model/wing-dozer-model";

/**ウィングドーザ ビュー */
export interface WingDozerView {
  /** ステータスアイコンの位置（ワールド座標） */
  statusIconPosition: StatusIconPosition;

  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: WingDozerModel): void;

  /**
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void;

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object 追加するオブジェクト
   */
  addObject3D(object: THREE.Object3D): void;
}
