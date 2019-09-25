// @flow

import * as THREE from 'three';
import type {RecoverBatteryModel} from "./model/recover-battery-model";
import type {RecoverBatteryView} from "./view/recover-battery-view";
import {createInitialValue} from "./model/initial-value";
import type {GameObjectAction} from "../../action/game-object-action";
import {Observable, Subscription} from "rxjs";
import type {Update} from "../../action/game-loop/update";
import type {PreRender} from "../../action/game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {popUp} from "./animation/pop-up";

type Param = {
  view: RecoverBatteryView,
  listener: Observable<GameObjectAction>
};

export class RecoverBattery {
  _model: RecoverBatteryModel;
  _view: RecoverBatteryView;
  _subscription: Subscription;

  constructor(param: Param): void {
    this._model = createInitialValue();
    this._view = param.view;
    this._subscription = param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    })
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * 回復バッテリーを一定時間表示する
   *
   * @param value バッテリー回復量
   * @return アニメーション
   */
  popUp(value: number): Animate {
    return popUp(this._model, value);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.OBject3D {
    return this._view.getObject3D();
  }

  /**
   * ゲームオブジェクト状態更新
   *
   * @param action アクション
   */
  _update(action: Update): void {
    this._view.engage(this._model);
  }

  /**
   * プリレンダ
   *
   * @param action アクション
   */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera)
  }
}