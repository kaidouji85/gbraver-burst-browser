// @flow

import * as THREE from 'three';
import type {RecoverBatteryModel} from "./model/recover-battery-model";
import type {RecoverBatteryView} from "./view/recover-battery-view";
import {createInitialValue} from "./model/initial-value";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {popUp} from "./animation/pop-up";
import {RecoverBatterySounds} from "./sounds/recover-battery-sounds";
import type {Resources} from "../../resource";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";

/**
 * コンストラクタのパラメータ
 */
type Param = {
  view: RecoverBatteryView,
  resources: Resources,
  listener: Stream<GameObjectAction>,
};

/**
 * バッテリー回復
 */
export class RecoverBattery {
  _model: RecoverBatteryModel;
  _view: RecoverBatteryView;
  _sounds: RecoverBatterySounds;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param): void {
    this._model = createInitialValue();
    this._view = param.view;
    this._sounds = new RecoverBatterySounds(param.resources);
    this._unsubscriber = param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update();
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    })
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
  }

  /**
   * 回復バッテリーを一定時間表示する
   *
   * @param value バッテリー回復量
   * @return アニメーション
   */
  popUp(value: number): Animate {
    return popUp(this._model, this._sounds, value);
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
   * ゲームオブジェクト状態更新
   */
  _update(): void {
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