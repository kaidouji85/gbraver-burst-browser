import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { GameObjectAction } from "../action/game-object-action";
import { hidden, popUp, show } from "./animation/pop-up";
import {
  createRecoverBatteryProps,
  PropsCreatorParams,
} from "./props/create-recover-battery-props";
import { RecoverBatteryProps } from "./props/recover-battery-props";

/** コンストラクタのパラメータ */
export type RecoverBatteryParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * バッテリー回復
 */
export class RecoverBattery {
  /** プロパティ */
  #props: RecoverBatteryProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: RecoverBatteryParams) {
    this.#props = createRecoverBatteryProps(param);
    this.#unsubscriber = param.gameObjectAction.subscribe((action) => {
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
   * 回復バッテリーを一定時間表示する
   * @param value バッテリー回復量
   * @returns アニメーション
   */
  popUp(value: number): Animate {
    return popUp(this.#props, value);
  }

  /**
   * 表示
   * @param value バッテリー回復量
   * @returns アニメーション
   */
  show(value: number): Animate {
    return show(this.#props, value);
  }

  /**
   * 非表示
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * ゲームオブジェクト状態更新
   */
  #update(): void {
    this.#props.view.engage(this.#props.model);
  }

  /**
   * プリレンダ
   *
   * @param action アクション
   */
  #preRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
