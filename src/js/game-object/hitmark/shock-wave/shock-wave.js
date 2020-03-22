// @flow

import * as THREE from 'three';
import type {ShockWaveView} from "./view/shock-wave-view";
import type {ShockWaveModel} from "./model/shock-wave-model";
import {initialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {Update} from "../../../action/game-loop/update";

/**
 * 衝撃波
 */
export class ShockWave {
  _model: ShockWaveModel;
  _view: ShockWaveView;
  _subscription: Subscription;

  constructor(view: ShockWaveView, listener: Observable<GameObjectAction>) {
    this._model = initialValue();
    this._view = view;
    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
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
}