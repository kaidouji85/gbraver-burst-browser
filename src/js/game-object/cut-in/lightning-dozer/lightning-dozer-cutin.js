// @flow

import * as THREE from "three";
import type {LightningDozerCutInModel} from "./model/lightning-dozer-cutin-model";
import type {LightningDozerCutInView} from "./view/lightning-dozer-cutin-view";
import {createInitialValue} from "./model/initial-value";
import type {PreRender} from "../../../game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {show} from "./animation/show";
import {hidden} from "./animation/hidden";
import type {HUDTracking} from "../../../tracking/hud-tracking";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream, Unsubscriber} from "../../../stream/core";

/**
 * ライトニングドーザ カットイン
 */
export class LightningDozerCutIn implements HUDTracking {
  _model: LightningDozerCutInModel;
  _view: LightningDozerCutInView;
  _unSubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param listener イベントリスナ
   */
  constructor(view: LightningDozerCutInView, listener: Stream<GameObjectAction>) {
    this._view = view;
    this._model = createInitialValue();
    this._unSubscriber = listener.subscribe(action => {
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
    this._unSubscriber.unsubscribe();
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
   * カットインを表示する
   *
   * @return アニメーション
   */
  show(): Animate {
    return show(this._model);
  }

  /**
   * カットインを非表示にする
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this._model);
  }

  /**
   * 3Dレイヤーオブジェクトのトラッキンングを行う
   * 本パラメータにはHUD座標系に変換した値をセットすること
   *
   * @param x x座標
   * @param y y座標
   */
  tracking(x: number, y: number): void {
    this._model.tracking.x = x;
    this._model.tracking.y = y;
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