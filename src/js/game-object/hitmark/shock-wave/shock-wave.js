// @flow

import * as THREE from 'three';
import type {ShockWaveView} from "./view/shock-wave-view";
import type {ShockWaveModel} from "./model/shock-wave-model";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {popUp} from "./animation/pop-up";

/**
 * 衝撃波
 */
export class ShockWave {
  _model: ShockWaveModel;
  _view: ShockWaveView;
  _subscription: Subscription;

  constructor(view: ShockWaveView, initialModel: ShockWaveModel, listener: Observable<GameObjectAction>) {
    this._model = initialModel;
    this._view = view;
    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
      } else if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * 衝撃波を表示する
   *
   * @return アニメーション
   */
  popUp(): Animate {
    return popUp(this._model);
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * アップデート時の処理
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
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