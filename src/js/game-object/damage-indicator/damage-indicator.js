// @flow

import type {DamageIndicatorView} from "./view/damage-indicator-view";
import {createInitialValue} from "./model/initial-value";
import type {DamageIndicatorModel} from "./model/damage-indicator-model";
import * as THREE from 'three';
import {popUp} from "./animation/pop-up";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/stream";

/** ダメージインジケータ */
export class DamageIndicator {
  _model: DamageIndicatorModel;
  _view: DamageIndicatorView;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param gameObjectAction Stream<GameObjectAction>
   */
  constructor(view: DamageIndicatorView, gameObjectAction: Stream<GameObjectAction>) {
    this._view = view;
    this._model = createInitialValue();
    this._unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'Update') {
        this._update();
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
  }

  /** ダメージ数字を表示する */
  popUp(damage: number): Animate {
    return popUp(this._model, damage);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update() {
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}