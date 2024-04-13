import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { GameObjectAction } from "../action/game-object-action";
import { popUp } from "./animation/pop-up";
import { BatteryCorrectProps } from "./props/battery-correct-props";
import {createBatteryCorrectProps, GenerateBatteryCorrectPropsParams} from "./props/create-battery-correct-props";

/** コンストラクタのパラメータ */
type Params = GenerateBatteryCorrectPropsParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>,
}

/** バッテリー補正 */
export class BatteryCorrect {
  /** プロパティ */
  #props: BatteryCorrectProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: Params) {
    const { gameObjectAction, view } = params;
    this.#props = createBatteryCorrectProps({ view });
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * ポップアップ表示
   * @param value 補正値
   * @return アニメーション
   */
  popUp(value: number): Animate {
    return popUp(this.#props, value);
  }

  /**
   * プリレンダー時の処理
   * @param action プリレンダー情報
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }
}
