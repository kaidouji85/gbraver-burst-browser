// @flow
import * as THREE from "three";
import type {ResultIndicatorView} from "./view/result-indicator-view";
import type {ResultIndicatorModel} from "./model/result-indicator-model";
import {createInitialValue} from "./model/initial-value";
import type {Stream, Unsubscriber} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {slideIn} from "./animation/slide-in";

/** リザルトインジケータ */
export class ResultIndicator {
  _model: ResultIndicatorModel;
  _view: ResultIndicatorView;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: ResultIndicatorView, gameObjectAction: Stream<GameObjectAction>) {
    this._view = view;
    this._model = createInitialValue();
    this._unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscriber.unsubscribe();
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

  /**
   * スライドイン
   *
   * @return アニメーション
   */
  slideIn(): Animate {
    return slideIn(this._model);
  }

  /**
   * PreRender時の処理
   *
   * @param action PreRender情報
   */
  _onPreRender(action: PreRender): void {
    this._view.engage(this._model, action);
  }
}