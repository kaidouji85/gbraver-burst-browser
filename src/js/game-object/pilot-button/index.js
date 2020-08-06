// @flow

import * as THREE from 'three';
import type {Resources} from "../../resource";
import {PilotButtonView} from "./view/pilot-button-view";
import type {PilotButtonModel} from "./model/pilot-button-model";
import {createInitialValue} from './model/initial-value';
import {Observable, Subject, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {PreRender} from "../../action/game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {open} from "./animation/open";
import {decide} from "./animation/decide";
import {close} from "./animation/close";

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
  _view: PilotButtonView;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param listener イベントリスナ
   */
  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = new PilotButtonView(resources, listener);
    this._subscription = listener.subscribe(action => {
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
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
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
    return decide(this._model);
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
    const viewNotifier = this._view.notifier();
    return {
      pushButton: viewNotifier.pushButton
    };
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