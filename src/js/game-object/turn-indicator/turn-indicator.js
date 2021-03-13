// @flow

import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import type {Resources} from "../../resource";
import type {TurnIndicatorModel} from "./model/turn-indicator-model";
import {TurnIndicatorView} from "./view/turn-indicator-view";
import type {PreRender} from "../../game-loop/pre-render";
import {invisible} from "./animation/invisible";
import {turnChange} from "./animation/turn-change";
import {Animate} from "../../animation/animate";
import {createInitialValue} from "./model/initial-value";
import {waiting} from "./animation/waiting";
import type {Update} from "../../game-loop/update";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";
import {firstUpdate} from "../action/first-update";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  listener: Stream<GameObjectAction>
};

/** ターンインジケーター */
export class TurnIndicator {
  _tweenGroup: typeof TWEEN.Group;
  _model: TurnIndicatorModel;
  _view: TurnIndicatorView;
  _unsubscribers: Unsubscriber[];

  constructor(param: Param) {
    this._tweenGroup = new TWEEN.Group();
    this._model = createInitialValue();
    this._view = new TurnIndicatorView(param.resources);

    this._unsubscribers = [
      param.listener.subscribe(action => {
        if (action.type === 'Update') {
          this._onUpdate(action);
        } else if (action.type === 'PreRender') {
          this._onPreRender(action);
        }
      }),

      firstUpdate(param.listener).subscribe(() => {
        this._onFirstUpdate();
      })
    ];
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
    this._tweenGroup.removeAll();
  }

  /**
   * ターン変更
   *
   * @param isPlayerTurn プレイヤーターンか否かのフラグ、trueでプレイヤーターン
   * @return アニメーション
   */
  turnChange(isPlayerTurn: boolean): Animate {
    return turnChange(isPlayerTurn, this._model);
  }

  /**
   * 非表示にする
   *
   * @return アニメーション
   */
  invisible(): Animate {
    return invisible(this._model);
  }

  /** ターンインジケーターで使うthree.jsオブジェクトを返す */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * 初回のアップデート時にのみ実行される処理
   */
  _onFirstUpdate(): void {
    waiting(this._model, this._tweenGroup).loop();
  }

  /**
   * アップデート時の処理
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._tweenGroup.update(action.time);
    this._view.engage(this._model);
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}
