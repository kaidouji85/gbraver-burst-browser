// @flow

import * as THREE from 'three';
import type {ReflectIndicatorView} from "./view/reflect-indicator-view";
import type {ReflectIndocatorModel} from "./model/reflect-indocator-model";
import {createInitialValue} from "./model/initial-value";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {popUp} from "./animation/pop-up";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";

/**
 * ダメージ反射
 */
export class ReflectIndicator {
  _model: ReflectIndocatorModel;
  _view: ReflectIndicatorView;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param listener イベントリスナ
   */
  constructor(view: ReflectIndicatorView, listener: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._unsubscriber = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate();
      } else if (action.type === 'PreRender') {
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
   * ポップアップ
   * 
   * @return アニメーション
   */
  popUp(): Animate {
    return popUp(this._model);
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
   * アップデート時の処理
   */
  _onUpdate(): void {
    this._view.engage(this._model);
  }

  /**
   * プリレンダー時の処置
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}