import * as THREE from "three";
import { GenesisBraverCutInView } from "./view/genesis-braver-cutin-view";

/** ジェネシスブレイバー カットイン */
export class GenesisBraverCutIn {
  /** ビュー */
  #view: GenesisBraverCutInView;

  /**
   * コンストラクタ
   * @param resources ビュー
   */
  constructor(view: GenesisBraverCutInView) {
    this.#view = view;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }
}