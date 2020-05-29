// @flow

import {Howl} from 'howler';
import * as THREE from 'three';
import type {BurstButtonModel} from "./model/burst-button-model";
import {BurstButtonView} from "./view/burst-button-view";
import type {Resources} from "../../resource";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import {createInitialValue} from "./model/initial-value";
import {open} from './animation/open';
import {close} from './animation/close';
import type {Update} from "../../action/game-loop/update";
import {Animate} from "../../animation/animate";
import type {PreRender} from "../../action/game-loop/pre-render";
import {SOUND_IDS} from "../../resource/sound";

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>,
  onPush: () => void,
};

/** バーストボタン */
export class BurstButton {
  _model: BurstButtonModel;
  _view: BurstButtonView;
  _pushButtonSound: Howl;
  _subscription: Subscription;

  constructor(param: Param) {
    const pushButtonResource = param.resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON);
    this._pushButtonSound = pushButtonResource
      ? pushButtonResource.sound
      : new Howl();

    this._model = createInitialValue();
    this._view = new BurstButtonView({
      resources: param.resources,
      listener: param.listener,
      onPush: () => {
        if (this._model.disabled || !this._model.canBurst) {
          return;
        }

        this._pushButtonSound.play();
        param.onPush();
      }
    });
    this._subscription = param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * ボタンを表示する
   *
   * @param canBurst バースト可能フラグ、trueでバースト可能
   */
  open(canBurst: boolean): Animate {
    return open(this._model, canBurst);
  }

  /**
   * ボタンを非表示にする
   *
   * @param delay 非表示アニメが再生されるまでディライ
   */
  close(): Animate {
    return close(this._model);
  }

  /** three.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.preRender(action);
  }
}