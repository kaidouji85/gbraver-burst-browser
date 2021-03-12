// @flow

import * as THREE from "three";
import type {IlluminationModel} from "./model/illumination-model";
import {IlluminationView} from "./view/illumination-view";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import {Animate} from "../../animation/animate";
import {intensity} from "./animation/intensity";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";

/**
 * ステージ全体の照明
 */
export class Illumination {
  _model: IlluminationModel;
  _view: IlluminationView;
  _unsubscriber: Unsubscriber;

  constructor(listener: Stream<GameObjectAction>) {
    this._model = createInitialValue();

    this._view = new IlluminationView();
    this._view.engage(this._model);

    this._unsubscriber = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate();
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._unsubscriber.unsubscribe();
  }

  /**
   * シーンに追加するオブジェクトを配列で返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return this._view.getObject3Ds();
  }

  /**
   * 照明の強さを変更する
   *
   * @param value 照明の強さ
   * @param duration アニメーション時間
   * @return アニメーション
   */
  intensity(value: number, duration: number): Animate {
    return intensity(this._model, value, duration);
  }

  /**
   * アップデート時の処理
   */
  _onUpdate(): void {
    this._view.engage(this._model);
  }
}