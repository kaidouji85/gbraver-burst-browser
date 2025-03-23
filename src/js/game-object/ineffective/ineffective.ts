import { Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { PreRender } from "../../game-loop/pre-render";
import { GameObjectActionContainer } from "../action/game-object-action-container";
import { popUp } from "./animation/pop-up";
import {
  createIneffectiveProps,
  PropsCreatorParams,
} from "./props/create-ineffective-props";
import { IneffectiveProps } from "./props/ineffective-props";

/** コンストラクタのオプション */
export type IneffectiveOptions = PropsCreatorParams & GameObjectActionContainer;

/** 効果無効 */
export class Ineffective {
  /** プロパティ */
  #props: IneffectiveProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: IneffectiveOptions) {
    const { gameObjectAction } = params;
    this.#props = createIneffectiveProps(params);
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
   *
   * @returns アニメーション
   */
  popUp(): Animate {
    return popUp(this.#props);
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
   * アップデート時の処理
   */
  #onUpdate(): void {
    this.#props.view.engage(this.#props.model);
  }

  /**
   * プリレンダー時の処置
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
