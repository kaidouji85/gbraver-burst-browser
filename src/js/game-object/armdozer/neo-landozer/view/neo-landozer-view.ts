import * as THREE from "three";

import { StatusIconPosition } from "../../armdozer-sprite";
import { NeoLandozerModel } from "../model/neo-landozer-model";

/** ネオランドーザのビュー */
export interface NeoLandozerView {
  /** ステータスアイコンの位置（ワールド座標） */
  statusIconPosition: StatusIconPosition;

  /** デストラクタ */
  destructor(): void;

  /** モデルをビューに反映させる */
  engage(model: NeoLandozerModel): void;

  /** カメラの真正面を向く */
  lookAt(camera: THREE.Camera): void;

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /**
   * スプライト配下にオブジェクトを追加する
   * @param object 追加するオブジェクト
   */
  addObject3D(object: THREE.Object3D): void;
}
