import * as THREE from "three";

import { FaderModel } from "../model/fader-model";

/** 画面フェーダービュー */
export interface FaderView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: FaderModel): void;
}
