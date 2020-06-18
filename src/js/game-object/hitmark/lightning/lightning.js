// @flow

import * as THREE from 'three';
import type {LightningModel} from "./model/lightning-model";
import type {LightningView} from "./view/lightning-view";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {Update} from "../../../action/game-loop/update";
import {Animate} from "../../../animation/animate";
import {popUp} from "./animation/pop-up";
import {LightningSounds} from "./sounds/lightning-sounds";
import type {Resources} from "../../../resource";

/**
 * 電撃ヒットマーク
 */
export class Lightning {
 _model: LightningModel;
 _view: LightningView;
 _sounds: LightningSounds;
 _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param listener イベントリスナ
   */
  constructor(view: LightningView, resources: Resources, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new LightningSounds(resources);
    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
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
   * エフェクトを一瞬だけ表示する
   *
   * @return アニメーション
   */
  popUp(): Animate {
    return popUp(this._model, this._sounds);
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
   * アップデート時の処理
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._view.engage(this._model);
  }
}