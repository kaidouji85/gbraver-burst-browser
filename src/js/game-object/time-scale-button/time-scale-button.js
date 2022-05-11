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
import type {Stream, Unsubscriber} from "../../stream/stream";
import {filter, map} from "../../stream/operator";
import type {GameObjectAction} from "../action/game-object-action";
import type {PreRender} from "../../game-loop/pre-render";
import type {Animate} from "../../animation/animate";

/** ボタン押下情報 */
type PushButton = {
  /** タイムスケール現在値 */
  timeScale: number,
  /** トグル後のタイムスケール */
  nextTimeScale: number
};

/** アニメーションタイムスケールボタン */
export class TimeScaleButton {
  _model: TimeScaleButtonModel;
  _view: TimeScaleButtonView;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = new TimeScaleButtonView(resources, gameObjectAction);
    this._unsubscriber = gameObjectAction.subscribe(action => {
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
   * ボタン押下通知
   * 
   * @return 通知ストリーム
   */
  pushNotifier(): Stream<PushButton> {
    return this._view.pushButtonNotifier()
      .chain(filter(() => !this._model.disabled))
      .chain(map(() => {
        const timeScale = this._model.timeScale;
        const nextTimeScale = getNextTimeScale(timeScale);
        return {timeScale, nextTimeScale};    
      }));
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
   * タイムスケールを切り替える
   * 
   * @return アニメーション
   */
  toggle(): Animate {
    const nextTimeScale = getNextTimeScale(this._model.timeScale);
    return toggle(this._model, nextTimeScale);
  }

  /**
   * プリレンダー時の処理
   *
   * @param preRender プリレンダー
   */
  _onPreRender(preRender: PreRender): void {
    this._view.engage(this._model, preRender);
  }
}