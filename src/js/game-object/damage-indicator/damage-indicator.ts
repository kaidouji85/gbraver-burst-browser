import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { GameObjectAction } from "../action/game-object-action";
import { popUp } from "./animation/pop-up";
import {
  createDamageIndicatorProps,
  PropsCreatorParams,
} from "./props/create-damage-indicator-props";
import { DamageIndicatorProps } from "./props/damage-indicator-props";

/** コンストラクタのパラメータ */
export type DamageIndicatorParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ダメージインジケータ */
export class DamageIndicator {
  /** プロパティ */
  #props: DamageIndicatorProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: DamageIndicatorParams) {
    const { gameObjectAction } = params;
    this.#props = createDamageIndicatorProps(params);
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

  /** ダメージ数字を表示する */
  popUp(damage: number): Animate {
    return popUp(this.#props, damage);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * アップデート時の処理
   */
  #update() {
    this.#props.view.engage(this.#props.model);
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #preRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
