import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { PreRender } from "../../game-loop/pre-render";
import { GameObjectAction } from "../action/game-object-action";
import { hidden } from "./animation/hidden";
import { moveToEdge } from "./animation/move-to-edge";
import { slideInToCenter } from "./animation/slide-in-to-center";
import { slideInToEdge } from "./animation/slide-in-to-edge";
import { createInitialValue } from "./model/initial-value";
import { ResultIndicatorModel } from "./model/result-indicator-model";
import { ResultIndicatorView } from "./view/result-indicator-view";

/** リザルトインジケータ */
export class ResultIndicator {
  /** モデル */
  #model: ResultIndicatorModel;
  /** ビュー */
  #view: ResultIndicatorView;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
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
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * 画面中央にスライドイン表示
   * @returns アニメーション
   */
  slideInToCenter(): Animate {
    return slideInToCenter(this.#model);
  }

  /**
   * 画面左上にスライドイン表示
   * @returns アニメーション
   */
  slideInToEdge(): Animate {
    return slideInToEdge(this.#model);
  }

  /**
   * 画面左上に移動する
   * @returns アニメーション
   */
  moveToEdge(): Animate {
    return moveToEdge(this.#model);
  }

  /**
   * 非表示
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#model);
  }

  /**
   * PreRender時の処理
   * @param action PreRender情報
   */
  #onPreRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }
}
