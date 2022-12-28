// @flow

import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { Stream, Unsubscriber } from "../../stream/stream";
import type { GameObjectAction } from "../action/game-object-action";
import { intensity } from "./animation/intensity";
import type { IlluminationModel } from "./model/illumination-model";
import { createInitialValue } from "./model/initial-value";
import { IlluminationView } from "./view/illumination-view";

/**
 * ステージ全体の照明
 */
export class Illumination {
  #model: IlluminationModel;
  #view: IlluminationView;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(gameObjectAction: Stream<GameObjectAction>) {
    this.#model = createInitialValue();

    this.#view = new IlluminationView();
    this.#view.engage(this.#model);

    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate();
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * シーンに追加するオブジェクトを配列で返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return this.#view.getObject3Ds();
  }

  /**
   * 照明の強さを変更する
   *
   * @param value 照明の強さ
   * @param duration アニメーション時間
   * @return アニメーション
   */
  intensity(value: number, duration: number): Animate {
    return intensity(this.#model, value, duration);
  }

  /**
   * アップデート時の処理
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }
}
