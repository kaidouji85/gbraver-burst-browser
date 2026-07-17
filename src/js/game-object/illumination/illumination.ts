import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { Update } from "../../game-loop/update";
import type { GameObjectAction } from "../action/game-object-action";
import { color } from "./animation/color";
import { intensity } from "./animation/intensity";
import type { IlluminationModel } from "./model/illumination-model";
import { createInitialValue } from "./model/initial-value";
import { IlluminationView } from "./view/illumination-view";

/** ステージ全体の照明 */
export class Illumination {
  /** モデル */
  #model: IlluminationModel;
  /** ビュー */
  #view: IlluminationView;
  /** Tweenグループ */
  #tweenGroup: TWEEN.Group = new TWEEN.Group();

  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(gameObjectAction: Observable<GameObjectAction>) {
    this.#model = createInitialValue();
    this.#view = new IlluminationView();
    this.#view.engage(this.#model);
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#tweenGroup.removeAll();
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * シーンに追加するオブジェクトを配列で返す
   * @returns シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return this.#view.getObject3Ds();
  }

  /**
   * 照明の強さを変更する
   * 1が標準の強さで、0に近づくほど暗くなる
   * @param value 照明の強さ
   * @param duration アニメーション時間
   * @returns アニメーション
   */
  intensity(value: number, duration: number): Animate {
    return intensity(this.#model, value, duration);
  }

  /**
   * 割り込み可能な照明の強さ変更
   * 1が標準の強さで、0に近づくほど暗くなる
   * @param value 照明の強さ
   * @param duration アニメーション時間
   */
  interruptToIntensity(value: number, duration: number): void {
    this.#tweenGroup.update();
    this.#tweenGroup.removeAll();
    intensity(this.#model, value, duration).play({ group: this.#tweenGroup });
  }

  /**
   * 照明の色味を変更する
   * 1がベースの色味で、0に近づくほど暗くなる
   * @param value 変更する色味
   * @param value.r 赤成分
   * @param value.g 緑成分
   * @param value.b 青成分
   * @param duration アニメーション時間
   * @returns アニメーション
   */
  color(value: { r: number; g: number; b: number }, duration: number): Animate {
    return color(this.#model, value, duration);
  }

  /**
   * アップデート時の処理
   */
  #onUpdate(action: Update): void {
    this.#tweenGroup.update(action.time);
    this.#view.engage(this.#model);
  }
}
