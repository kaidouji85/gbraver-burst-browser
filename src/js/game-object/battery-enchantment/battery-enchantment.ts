import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { GameObjectAction } from "../action/game-object-action";
import { popUp } from "./animation/pop-up";
import {BatteryEnchantmentProps} from "./props/battery-enchantment-props";
import {
  createBatteryEnchantmentProps,
  GenerateBatteryEnchantmentPropsParams
} from "./props/create-battery-enchantment-props";

/** コンストラクタのパラメータ */
type Params = GenerateBatteryEnchantmentPropsParams & {
  gameObjectAction: Observable<GameObjectAction>;
};

/** バッテリー増強 */
export class BatteryEnchantment {
  /** プロパティ */
  #props: BatteryEnchantmentProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: Params) {
    const { gameObjectAction } = params;
    this.#props = createBatteryEnchantmentProps(params);
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate();
      } else if (action.type === "PreRender") {
        this.#onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * ポップアップ
   * @return アニメーション
   */
  popUp(): Animate {
    return popUp(this.#props);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * アップデート時の処理
   */
  #onUpdate(): void {
    this.#props.view.engage(this.#props.model);
  }

  /**
   * プリレンダー時の処置
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
