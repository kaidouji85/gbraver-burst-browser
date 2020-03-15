// @flow

import * as THREE from 'three';
import {FaderView} from "./view/fader-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {PreRender} from "../../action/game-loop/pre-render";
import type {FaderModel} from "./model/fader-model";
import {createInitialValue} from "./model/initial-value";
import {Animate} from "../../animation/animate";
import {fadeIn} from "./animation/fade-in";
import {fadeOut} from "./animation/fade-out";

/** コンストラクタのパラメータ */
type Param = {
  isVisible: boolean,
  listener: Observable<GameObjectAction>,
  z: number,
};

/** 画面フェーダー */
export class Fader {
  _model: FaderModel;
  _view: FaderView;
  _subscription: Subscription;

  constructor(param: Param) {
    this._model = createInitialValue(param.isVisible);
    this._view = new FaderView(param.z);
    this._subscription = param.listener.subscribe(action => {
      if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * フェードイン
   *
   * @return アニメーション
   */
  fadeIn(): Animate {
    return fadeIn(this._model);
  }

  /**
   * フェードアウト
   *
   * @return アニメーション
   */
  fadeOut(): Animate {
    return fadeOut(this._model);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * プリレンダーの際の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._model.width = action.rendererDOM.clientWidth;
    this._model.height = action.rendererDOM.clientHeight;
    this._view.engage(this._model);
  }
}