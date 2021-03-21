// @flow

import * as THREE from 'three';
import {FaderView} from "./view/fader-view";
import type {PreRender} from "../../game-loop/pre-render";
import type {FaderModel} from "./model/fader-model";
import {createInitialValue} from "./model/initial-value";
import {Animate} from "../../animation/animate";
import {fadeIn} from "./animation/fade-in";
import {fadeOut} from "./animation/fade-out";
import {opacity} from "./animation/opacity";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";

/** コンストラクタのパラメータ */
type Param = {
  isVisible: boolean,
  listener: Stream<GameObjectAction>,
  z: number,
};

/** 画面フェーダー */
export class Fader {
  _model: FaderModel;
  _view: FaderView;
  _unsubscriber: Unsubscriber;

  constructor(param: Param) {
    this._model = createInitialValue(param.isVisible);
    this._view = new FaderView(param.z);
    this._unsubscriber = param.listener.subscribe(action => {
      if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
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
   * 透明度を変更
   *
   * @param value 透明度
   * @param duration アニメーション時間
   * @return アニメーション
   */
  opacity(value: number, duration: number): Animate {
    return opacity(this._model, value, duration);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
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