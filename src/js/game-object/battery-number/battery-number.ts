import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { GameObjectAction } from "../action/game-object-action";
import { change } from "./animation/change";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import type { BatteryNumberModel } from "./model/battery-number-model";
import { createInitialValue } from "./model/initial-value";
import type { BatteryNumberView } from "./view/battery-number-view";

/** バッテリー数字 */
export class BatteryNumber {
  #model: BatteryNumberModel;
  #view: BatteryNumberView;
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: BatteryNumberView,
    gameObjectAction: Observable<GameObjectAction>
  ) {
    this.#model = createInitialValue();
    this.#view = view;
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

  /**
   * バッテリー数字を表示する
   *
   * @param battery バッテリー値
   * @return アニメーション
   */
  show(battery: number): Animate {
    return show(this.#model, battery);
  }

  /**
   * 数字を変更する
   *
   * @param battery 変更する値
   * @return アニメーション
   */
  change(battery: number): Animate {
    return change(this.#model, battery);
  }

  /**
   * バッテリー数字を消す
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#model);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /** 状態更新 */
  #update(): void {
    this.#view.engage(this.#model);
  }

  /** プリレンダー */
  #preRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
