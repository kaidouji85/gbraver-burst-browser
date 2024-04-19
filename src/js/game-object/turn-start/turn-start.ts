import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { GameObjectAction } from "../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import { createInitialValue } from "./model/initial-value";
import type { TurnStartModel } from "./model/turn-start-model";
import type { TurnStartView } from "./view/turn-start-view";

/**
 * ターンスタート
 */
export class TurnStart {
  #model: TurnStartModel;
  #view: TurnStartView;
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: TurnStartView,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "PreRender") {
        this.#onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * 表示する
   *
   * @return アニメーション
   */
  show(): Animate {
    return show(this.#model);
  }

  /**
   * 非表示にする
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#model);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * プリレンダー時の処置
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }
}
