// @flow

import {Howl} from 'howler';
import * as THREE from 'three';
import type {BurstButtonModel} from "./model/burst-button-model";
import {BurstButtonView} from "./view/burst-button-view";
import type {Resources} from "../../resource";
import {createInitialValue} from "./model/initial-value";
import {open} from './animation/open';
import {close} from './animation/close';
import {Animate} from "../../animation/animate";
import type {PreRender} from "../../game-loop/pre-render";
import {SOUND_IDS} from "../../resource/sound";
import {decide} from "./animation/decide";
import type {ArmDozerId} from "gbraver-burst-core";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import {RxjsStreamSource} from "../../stream/rxjs";

type Param = {
  resources: Resources,
  listener: Stream<GameObjectAction>,
  armDozerId: ArmDozerId,
};

/** バーストボタン */
export class BurstButton {
  _model: BurstButtonModel;
  _view: BurstButtonView;
  _pushButtonSound: typeof Howl;
  _pushButton: StreamSource<void>;
  _unsubscriber: Unsubscriber;

  constructor(param: Param) {
    const pushButtonResource = param.resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON);
    this._pushButtonSound = pushButtonResource
      ? pushButtonResource.sound
      : new Howl();
    this._pushButton = new RxjsStreamSource();

    this._model = createInitialValue();
    this._view = new BurstButtonView({
      resources: param.resources,
      listener: param.listener,
      armDozerId: param.armDozerId,
      onPush: () => {
        if (this._model.disabled || !this._model.canBurst) {
          return;
        }

        this._pushButton.next();
      }
    });
    this._unsubscriber = param.listener.subscribe(action => {
      if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
  }

  /**
   * ボタンを表示する
   *
   * @param canBurst バースト可能フラグ、trueでバースト可能
   * @return アニメーション
   */
  open(canBurst: boolean): Animate {
    return open(this._model, canBurst);
  }

  /**
   * 決定アニメーション
   *
   * @return アニメーション
   */
  decide(): Animate {
    this._pushButtonSound.play();
    return decide(this._model);
  }

  /**
   * ボタンを非表示にする
   *
   * @return アニメーション
   */
  close(): Animate {
    return close(this._model);
  }

  /** three.jsオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * ボタン押下通知
   *
   * @return 通知ストリーム
   */
  pushButtonNotifier(): Stream<void> {
    return this._pushButton;
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.engage(this._model, action);
  }
}