import * as THREE from "three";
import {LeadLineModel, Position} from "./model/lead-line-model";
import {LeadLineView} from "./view/lead-line-view";
import {initialValue} from "./model/initial-value";

/** 引き出し線 */
export class LeadLine {
  /** モデル */
  #model: LeadLineModel;
  /** ビュー */
  #view: LeadLineView;

  /**
   * コンストラクタ
   * @param view ビュー
   */
  constructor(view: LeadLineView) {
    this.#model = initialValue();
    this.#view = view;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
  }

  /**
   * 引き出し線を設定する
   * @param start 起点
   * @param end 終点
   */
  set(start: Position, end: Position): void {
    this.#model.start = start;
    this.#model.end = end;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }
}
