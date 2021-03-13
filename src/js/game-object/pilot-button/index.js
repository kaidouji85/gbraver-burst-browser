// @flow

import * as THREE from 'three';
import type {Resources} from "../../resource";
import {PilotButtonView} from "./view/pilot-button-view";
import type {PilotButtonModel} from "./model/pilot-button-model";
import {createInitialValue} from './model/initial-value';
import {Observable} from "rxjs";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {open} from "./animation/open";
import {decide} from "./animation/decide";
import {close} from "./animation/close";
import {filter} from "rxjs/operators";
import {PilotButtonSounds} from "./sounds/pilot-button-sounds";
import type {PilotId} from "gbraver-burst-core";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";

/**
 * ,イベント通知ストリーム
 */
type Notifier = {
  pushButton: Observable<void>
};

/**
 * パイロットボタン
 */
export class PilotButton {
  _model: PilotButtonModel;
  _sounds: PilotButtonSounds;
  _view: PilotButtonView;
  _notifier: Notifier;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param pilotId パイロットID
   * @param listener イベントリスナ
   */
  constructor(resources: Resources, pilotId: PilotId, listener: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._sounds = new PilotButtonSounds(resources);
    this._view = new PilotButtonView(resources, pilotId, listener);

    const viewNotifier = this._view.notifier();
    this._notifier = {
      pushButton: viewNotifier.pushButton.pipe(
        filter(() => (!this._model.disabled) && this._model.canPilot)
      )
    };

    this._unsubscriber = listener.subscribe(action => {
      if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
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
   * パイロットボタン を表示する
   *
   * @param canPilot ボタン利用フラグ、trueで利用可能
   * @return アニメーション
   */
  open(canPilot: boolean): Animate {
    return open(this._model, canPilot);
  }

  /**
   * ボタンクリック
   *
   * @return アニメーション
   */
  decide(): Animate {
    return decide(this._model, this._sounds);
  }

  /**
   * パイロットボタンを非表示にする
   *
   * @return アニメーション
   */
  close(): Animate {
    return close(this._model);
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return this._notifier;
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.engage(this._model, action);
  }
}