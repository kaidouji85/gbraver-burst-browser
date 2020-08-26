// @flow

import * as THREE from "three";
import type {SkyBrightnessModel} from "./model/sky-brightness-model";
import {SkyBrightnessView} from "./view/sky-brightness-view";
import {createInitialValue} from "./model/initial-value";
import {Animate} from "../../animation/animate";
import {brightness} from "./animation/brightness";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Update} from "../../action/game-loop/update";

/** 空の明るさ */
export class SkyBrightness {
  _model: SkyBrightnessModel;
  _view: SkyBrightnessView;
  _subscription: Subscription;

  constructor(listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();

    this._view = new SkyBrightnessView();
    this._view.engage(this._model);

    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._view.destructor();
  }

  /**
   * 空の明るさを変更する
   *
   * @param value 空の明るさ
   * @param duration アニメーション時間
   * @return アニメーション
   */
  brightness(value: number, duration: number): Animate {
    return brightness(this._model, value, duration);
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
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._view.engage(this._model);
  }
}
