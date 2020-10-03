// @flow

import * as THREE from 'three';
import type {TurnStartView} from "./view/turn-start-view";
import type {TurnStartModel} from "./model/turn-start-model";
import type {GameObjectAction} from "../../action/game-object-action";
import {Observable, Subscription} from "rxjs";
import {createInitialValue} from "./model/initial-value";
import type {PreRender} from "../../action/game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {popUp} from "./animation/pop-up";
import {TurnStartSounds} from "./sounds/turn-start-sounds";
import type {Resources} from "../../resource";

/**
 * ターンスタート
 */
export class TurnStart {
  _model: TurnStartModel;
  _view: TurnStartView;
  _sounds: TurnStartSounds;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param listener イベントリスナ
   */
  constructor(view: TurnStartView, resources: Resources, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new TurnStartSounds(resources);
    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate();
      } else if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * ポップアップ
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
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * アップデート時の処理
   */
  _onUpdate(): void {
    this._view.engage(this._model);
  }

  /**
   * プリレンダー時の処置
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}