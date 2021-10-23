// @flow

import * as THREE from "three";
import type {SkyBrightnessModel} from "./model/sky-brightness-model";
import {SkyBrightnessView} from "./view/sky-brightness-view";
import {createInitialValue} from "./model/initial-value";
import {Animate} from "../../animation/animate";
import {brightness} from "./animation/brightness";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";

/** 空の明るさ */
export class SkyBrightness {
  _model: SkyBrightnessModel;
  _view: SkyBrightnessView;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();

    this._view = new SkyBrightnessView();
    this._view.engage(this._model);

    this._unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate();
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
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
   */
  _onUpdate(): void {
    this._view.engage(this._model);
  }
}
