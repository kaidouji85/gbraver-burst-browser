// @flow
import * as THREE from 'three';
import type {Resources} from "../../resource";
import {close} from "./animation/close";
import {open} from "./animation/open";
import {toggle} from "./animation/toggle";
import type {TimeScaleButtonModel} from "./model/time-scale-button-model";
import {getNextTimeScale} from "./model/next-time-scale";
import {createInitialValue} from "./model/initial-value";
import {TimeScaleButtonView} from "./view/time-scale-button-view";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/stream";
import {createStreamSource} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import type {PreRender} from "../../game-loop/pre-render";
import type {Animate} from "../../animation/animate";

/** アニメーションタイムスケールボタン */
export class TimeScaleButton {
  _model: TimeScaleButtonModel;
  _view: TimeScaleButtonView;
  _toggle: StreamSource<number>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = new TimeScaleButtonView(resources, gameObjectAction);
    this._toggle = createStreamSource();
    this._unsubscribers = [
      gameObjectAction.subscribe(action => {
        if (action.type === 'PreRender') {
          this._onPreRender(action);
        }
      }),
      this._view.pushButtonNotifier().subscribe(() => {
        this._onButtonPush();
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
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
   * タイムスケール変更通知
   * 
   * @return 通知ストリーム
   */
  toggleNotifier(): Stream<number> {
    return this._toggle;
  }

  /**
   * ボタンを表示する
   * 
   * @param timeScale タイムスケール値 
   * @return アニメーション
   */
  open(timeScale: number): Animate {
    return open(this._model, timeScale);
  }

  /**
   * ボタンを非表示にする
   * 
   * @return アニメーション
   */
  close(): Animate {
    return close(this._model);
  }

  /**
   * プリレンダー時の処理
   *
   * @param preRender プリレンダー
   */
  _onPreRender(preRender: PreRender): void {
    this._view.engage(this._model, preRender);
  }

  /**
   * ボタン押下時の処理
   */
  _onButtonPush(): void {
    if (this._model.disabled) {
      return;
    }

    const nextTimeScale = getNextTimeScale(this._model.timeScale);
    toggle(this._model, nextTimeScale).play();
    this._toggle.next(nextTimeScale);
  }
}