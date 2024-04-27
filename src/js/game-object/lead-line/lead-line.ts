import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { PreRender } from "../../game-loop/pre-render";
import { GameObjectAction } from "../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import { initialValue } from "./model/initial-value";
import { LeadLineModel, Position } from "./model/lead-line-model";
import { LeadLineView } from "./view/lead-line-view";

/** 引き出し線 */
export class LeadLine {
  /** モデル */
  #model: LeadLineModel;
  /** ビュー */
  #view: LeadLineView;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: LeadLineView,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#model = initialValue();
    this.#view = view;
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
    this.#view.destructor();
    this.#unsubscribers.forEach((unsubscriber) => unsubscriber.unsubscribe());
  }

  /**
   * 引き出し線を設定する
   * @param start 起点
   * @param end 終点
   */
  set(start: Position, end: Position): void {
    this.#model.start = start;
    this.#model.end = end;
  }

  /**
   * 引き出し線を表示する
   * @param model モデル
   * @returns アニメーション
   */
  show(): Animate {
    return show(this.#model);
  }

  /**
   * 引き出し線を消す
   * @param model モデル
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#model);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * PreRender時の処理
   */
  #onPreRender(action: Readonly<PreRender>): void {
    this.#view.engage(this.#model, action);
  }
}
