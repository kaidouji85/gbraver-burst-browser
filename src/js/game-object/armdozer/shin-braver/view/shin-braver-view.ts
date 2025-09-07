import * as THREE from "three";

import { StatusIconPosition } from "../../armdozer-sprite";
import { ShinBraverModel } from "../model/shin-braver-model";

/** シンブレイバーのビュー */
export interface ShinBraverView {
  /** ステータスアイコンの位置（ワールド座標） */
  statusIconPosition: StatusIconPosition;

  /**
   * デストラクタ相当の処置
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: ShinBraverModel): void;

  /**
   * カメラの真正面を向く
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void;

  /**
   * Sceneに追加するThree.jsオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;

  /**
   * スプライト配下のオブジェクトを追加する
   * @param object 追加するオブジェクト
   */
  addObject3D(object: THREE.Object3D): void;
}
