// @flow
import * as THREE from "three";
import type {ResultIndicatorView} from "./view/result-indicator-view";

/** リザルトインジケータ */
export class ResultIndicator {
  _view: ResultIndicatorView;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   */
  constructor(view: ResultIndicatorView) {
    this._view = view;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return 取得結果
   */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }
}