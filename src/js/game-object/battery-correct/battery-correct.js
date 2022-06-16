// @flow

import * as THREE from "three";
import {Animate} from "../../animation/animate";
import type {PreRender} from "../../game-loop/pre-render";
import type {Stream, Unsubscriber} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import {popUp} from './animation/pop-up';
import type {BatteryCorrectModel} from "./model/battery-correct-model";
import {initialValue} from "./model/initial-value";
import type {BatteryCorrectView} from "./view/battery-correct-view";

/** バッテリー補正 */
export class BatteryCorrect {
  #model: BatteryCorrectModel;
  #view: BatteryCorrectView;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: BatteryCorrectView, gameObjectAction: Stream<GameObjectAction>) {
    this.#model = initialValue();
    this.#view = view;
    this.#unsubscribers = [
      gameObjectAction.subscribe(action => {
        if (action.type === 'PreRender') { this.#onPreRender(action) }
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * ポップアップ表示
   *
   * @param value 補正値
   * @return アニメーション
   */
  popUp(value: number): Animate {
    return popUp(this.#model, value);
  }

  /**
   * プリレンダー時の処理
   *
   * @param action プリレンダー情報
   */
  #onPreRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }
}