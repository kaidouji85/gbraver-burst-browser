import * as THREE from "three";

import { ArmdozerWorldCoordinate } from "../../armdozer-sprite";
import { GenesisBraverModel } from "../model/genesis-braver-model";

/** ジェネシスブレイバービュー */
export interface GenesisBraverView {
  /** ステータスアイコンの位置情報（ワールド座標） */
  statusIconPosition: ArmdozerWorldCoordinate;
  /** 予測ダメージの位置情報（ワールド座標） */
  predicatedDamagePosition: ArmdozerWorldCoordinate;

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
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: GenesisBraverModel): void;

  /**
   * カメラの真正面を向く
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void;

  /**
   * スプライト配下のオブジェクトを追加する
   * @param object オブジェクト
   */
  addObject3D(object: THREE.Object3D): void;
}
