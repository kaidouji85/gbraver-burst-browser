import { Unsubscribable } from "rxjs";
import * as THREE from "three";

import { ResourcesContainer } from "../../resource";
import { GameObjectActionContainer } from "../action/game-object-action-container";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { hidden } from "./procedure/hidden";
import { show } from "./procedure/show";
import { createDeathAlertProps } from "./props/create-death-alert-props";
import { DeathAlertProps } from "./props/death-alert-props";

/** デスアラート */
export class DeathAlert {
  /** プロパティ */
  #props: DeathAlertProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options オプション
   * @param options.resources リソース管理オブジェクト
   * @param options.gameObjectAction ゲームオブジェクトアクション
   */
  constructor(options: ResourcesContainer & GameObjectActionContainer) {
    this.#props = createDeathAlertProps(options);
    this.#unsubscribers = bindEventListeners(
      this.#props,
      options.gameObjectAction,
    );
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((u) => u.unsubscribe());
  }

  /**
   * シーンに追加するための THREE.Object3D を取得する
   * @returns シーンに追加するための THREE.Object3D
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * 表示する
   * @param duration 表示にかかる時間
   */
  show(duration: number): void {
    show(this.#props, duration);
  }

  /**
   * 非表示にする
   * @param duration 非表示にかかる時間
   */
  hidden(duration: number): void {
    hidden(this.#props, duration);
  }
}
