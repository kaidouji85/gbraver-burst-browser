import TWEEN, { Group } from "@tweenjs/tween.js";
import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Update } from "../../game-loop/update";
import type { Resources } from "../../resource";
import { firstUpdate } from "../action/first-update";
import type { GameObjectAction } from "../action/game-object-action";
import { invisible } from "./animation/invisible";
import { turnChange } from "./animation/turn-change";
import { waiting } from "./animation/waiting";
import { createInitialValue } from "./model/initial-value";
import type { TurnIndicatorModel } from "./model/turn-indicator-model";
import { TurnIndicatorView } from "./view/turn-indicator-view";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ターンインジケーター */
export class TurnIndicator {
  #tweenGroup: Group;
  #model: TurnIndicatorModel;
  #view: TurnIndicatorView;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#tweenGroup = new TWEEN.Group();
    this.#model = createInitialValue();
    this.#view = new TurnIndicatorView(param.resources);
    this.#unsubscribers = [
      param.gameObjectAction.subscribe((action) => {
        if (action.type === "Update") {
          this.#onUpdate(action);
        } else if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
      firstUpdate(param.gameObjectAction).subscribe((action) => {
        this.#onFirstUpdate(action);
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#tweenGroup.removeAll();
  }

  /**
   * ターン変更
   * @param isPlayerTurn プレイヤーターンか否かのフラグ、trueでプレイヤーターン
   * @return アニメーション
   */
  turnChange(isPlayerTurn: boolean): Animate {
    return turnChange(isPlayerTurn, this.#model);
  }

  /**
   * 非表示にする
   * @return アニメーション
   */
  invisible(): Animate {
    return invisible(this.#model);
  }

  /**
   * ターンインジケーターで使うthree.jsオブジェクトを返す
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * 初回のアップデート時にのみ実行される処理
   * @param action アクション
   */
  #onFirstUpdate(action: Update): void {
    waiting(this.#model, this.#tweenGroup).loop(action.time);
  }

  /**
   * アップデート時の処理
   * @param action アクション
   */
  #onUpdate(action: Update): void {
    this.#tweenGroup.update(action.time);
    this.#view.engage(this.#model);
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
