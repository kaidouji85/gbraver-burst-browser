// @flow

import * as THREE from 'three';
import type {GaiModel} from "./model/gai-model";
import {GaiView} from "./view/gai-view";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {show} from "./animation/show";
import {hidden} from "./animation/hidden";
import type {HUDTracking} from "../../../tracking/hud-tracking";
import {GaiSounds} from "./sounds/gai-sounds";
import type {Resources} from "../../../resource";

/**
 * ガイ カットイン
 */
export class GaiCutIn implements HUDTracking {
  _model: GaiModel;
  _view: GaiView;
  _sounds: GaiSounds;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param listener イベントリスナ
   */
  constructor(view: GaiView, resources: Resources, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new GaiSounds(resources);
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
   * 3Dレイヤーのオブジェクトをトラッキングする
   * 本メソッドにはHUDレイヤー系座標をセットすること
   *
   * @param x x座標
   * @param y y座標
   */
  tracking(x: number, y: number): void {
    this._model.tracking.x = x;
    this._model.tracking.y = y;
  }

  /**
   * カットインを表示する
   *
   * @return アニメーション
   */
  show(): Animate {
    return show(this._model, this._sounds);
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
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
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