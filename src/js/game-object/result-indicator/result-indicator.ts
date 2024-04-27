import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { GameObjectAction } from "../action/game-object-action";
import { hidden } from "./animation/hidden";
import { moveToEdge } from "./animation/move-to-edge";
import { slideIn } from "./animation/slide-in";
import { createInitialValue } from "./model/initial-value";
import type { ResultIndicatorModel } from "./model/result-indicator-model";
import type { ResultIndicatorView } from "./view/result-indicator-view";

/** リザルトインジケータ */
export class ResultIndicator {
  #model: ResultIndicatorModel;
  #view: ResultIndicatorView;
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: ResultIndicatorView,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#view = view;
    this.#model = createInitialValue();
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "PreRender") {
        this.#onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscriber.unsubscribe();
    this.#view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * スライドイン表示
   *
   * @returns アニメーション
   */
  slideIn(): Animate {
    return slideIn(this.#model);
  }

  /**
   * 画面端に移動する
   *
   * @returns アニメーション
   */
  moveToEdge(): Animate {
    return moveToEdge(this.#model);
  }

  /**
   * 非表示
   *
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#model);
  }

  /**
   * PreRender時の処理
   *
   * @param action PreRender情報
   */
  #onPreRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }
}
