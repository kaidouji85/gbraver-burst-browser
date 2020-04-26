// @flow

import * as THREE from "three";
import type {LightningDozerCutInModel} from "./model/lightning-dozer-cutin-model";
import type {LightningDozerCutInView} from "./view/lightning-dozer-cutin-view";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {PreRender} from "../../../action/game-loop/pre-render";

/**
 * ライトニングドーザ カットイン
 */
export class LightningDozerCutIn {
  _model: LightningDozerCutInModel;
  _view: LightningDozerCutInView;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param listener イベントリスナ
   */
  constructor(view: LightningDozerCutInView, listener: Observable<GameObjectAction>) {
    this._view = view;
    this._model = createInitialValue();
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
    this._subscription.unsubscribe();
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