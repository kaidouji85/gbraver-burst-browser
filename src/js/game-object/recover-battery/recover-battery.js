// @flow

import * as THREE from 'three';
import {Animate} from "../../animation/animate";
import type {PreRender} from "../../game-loop/pre-render";
import type {Resources} from "../../resource";
import type {Stream, Unsubscriber} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import {hidden, popUp, show} from "./animation/pop-up";
import {createInitialValue} from "./model/initial-value";
import type {RecoverBatteryModel} from "./model/recover-battery-model";
import {RecoverBatterySounds} from "./sounds/recover-battery-sounds";
import type {RecoverBatteryView} from "./view/recover-battery-view";

/**
 * コンストラクタのパラメータ
 */
type Param = {
  /** ビュー */
  view: RecoverBatteryView,
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
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
    this._unsubscriber = param.gameObjectAction.subscribe(action => {
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
   * 表示
   *
   * @param value バッテリー回復量
   * @return アニメーション
   */
  show(value: number): Animate {
    return show(this._model, this._sounds, value);
  }

  /**
   * 非表示
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this._model);
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