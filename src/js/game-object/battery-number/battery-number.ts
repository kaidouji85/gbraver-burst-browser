import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { GameObjectAction } from "../action/game-object-action";
import { change } from "./animation/change";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import { BatteryNumberProps } from "./props/battery-number-props";
import {createBatteryNumberProps, GenerateBatteryNumberPropsParams} from "./props/create-battery-number-props";

/** コンストラクタのパラメータ */
type Params = GenerateBatteryNumberPropsParams & {
  gameObjectAction: Observable<GameObjectAction>;
};

/** バッテリー数字 */
export class BatteryNumber {
  /** プロパティ */
  #props: BatteryNumberProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: Params) {
    const { gameObjectAction } = params;
    this.#props = createBatteryNumberProps(params);
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
    this.#props.view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * バッテリー数字を表示する
   *
   * @param battery バッテリー値
   * @return アニメーション
   */
  show(battery: number): Animate {
    return show(this.#props, battery);
  }

  /**
   * 数字を変更する
   *
   * @param battery 変更する値
   * @return アニメーション
   */
  change(battery: number): Animate {
    return change(this.#props, battery);
  }

  /**
   * バッテリー数字を消す
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /** 状態更新 */
  #update(): void {
    this.#props.view.engage(this.#props.model);
  }

  /** プリレンダー */
  #preRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
