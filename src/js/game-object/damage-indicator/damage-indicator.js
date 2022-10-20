// @flow

import * as THREE from "three";
import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Stream, Unsubscriber } from "../../stream/stream";
import type { GameObjectAction } from "../action/game-object-action";
import { popUp } from "./animation/pop-up";
import type { DamageIndicatorModel } from "./model/damage-indicator-model";
import { createInitialValue } from "./model/initial-value";
import type { DamageIndicatorView } from "./view/damage-indicator-view";

/** ダメージインジケータ */
export class DamageIndicator {
  #model: DamageIndicatorModel;
  #view: DamageIndicatorView;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param gameObjectAction Stream<GameObjectAction>
   */
  constructor(
    view: DamageIndicatorView,
    gameObjectAction: Stream<GameObjectAction>
  ) {
    this.#view = view;
    this.#model = createInitialValue();
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#update();
      } else if (action.type === "PreRender") {
        this.#preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /** ダメージ数字を表示する */
  popUp(damage: number): Animate {
    return popUp(this.#model, damage);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this.#view.getObject3D();
  }

  /** 状態更新 */
  #update() {
    this.#view.engage(this.#model);
  }

  /** プリレンダー */
  #preRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
