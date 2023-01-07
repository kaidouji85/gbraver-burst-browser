import * as THREE from "three";
import { Animate } from "../../animation/animate";
import type { Stream, Unsubscriber } from "../../stream/stream";
import type { GameObjectAction } from "../action/game-object-action";
import { brightness } from "./animation/brightness";
import { createInitialValue } from "./model/initial-value";
import type { SkyBrightnessModel } from "./model/sky-brightness-model";
import { SkyBrightnessView } from "./view/sky-brightness-view";

/** 空の明るさ */
export class SkyBrightness {
  #model: SkyBrightnessModel;
  #view: SkyBrightnessView;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(gameObjectAction: Stream<GameObjectAction>) {
    this.#model = createInitialValue();
    this.#view = new SkyBrightnessView();
    this.#view.engage(this.#model);
    this.#unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === "Update") {
        this.#onUpdate();
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * 空の明るさを変更する
   *
   * @param value 空の明るさ
   * @param duration アニメーション時間
   * @return アニメーション
   */
  brightness(value: number, duration: number): Animate {
    return brightness(this.#model, value, duration);
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
   * アップデート時の処理
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }

}