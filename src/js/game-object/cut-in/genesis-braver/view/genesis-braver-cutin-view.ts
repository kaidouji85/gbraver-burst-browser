import * as THREE from "three";
import { GenesisBraverCutInModel } from "../model/genesis-braver-cutin-model";

/** ジェネシスブレイバー カットイン ビュー */
export interface GenesisBraverCutInView {
  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: GenesisBraverCutInModel): void;

  /**
   * シーンに追加するオブジェクトを取得
   */
  getObject3D(): THREE.Object3D;
}