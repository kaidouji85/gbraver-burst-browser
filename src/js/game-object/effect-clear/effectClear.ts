import { Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { PreRender } from "../../game-loop/pre-render";
import { GameObjectActionContainer } from "../action/game-object-action-container";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import {
  createEffectClearProps,
  PropsCreatorOptions,
} from "./props/create-effect-clear-props";
import { EffectClearProps } from "./props/effect-clear-props";

/** コンストラクタのオプション */
export type EffectClearOptions = PropsCreatorOptions &
  GameObjectActionContainer;

/** 効果消去 */
export class EffectClear {
  /** プロパティ */
  #props: EffectClearProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: EffectClearOptions) {
    const { gameObjectAction } = options;
    this.#props = createEffectClearProps(options);
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
   * 表示
   * @returns アニメーション
   */
  show(): Animate {
    return show(this.#props);
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
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
