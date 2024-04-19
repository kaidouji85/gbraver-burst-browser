import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { all } from "../../animation/all";
import { Animate } from "../../animation/animate";
import { onStart } from "../../animation/on-start";
import type { PreRender } from "../../game-loop/pre-render";
import type { Update } from "../../game-loop/update";
import type { ResourcesContainer } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { invisible } from "./animation/invisible";
import { show } from "./animation/show";
import { waiting } from "./animation/waiting";
import { createInitialValue } from "./model/initial-value";
import type { TurnIndicatorModel } from "./model/turn-indicator-model";
import { TurnIndicatorView } from "./view/turn-indicator-view";

/** コンストラクタのパラメータ */
type Param = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ターンインジケーター */
export class TurnIndicator {
  #tweenGroup: TWEEN.Group;
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
   * ターンインジケータを表示する
   * @param isPlayerTurn プレイヤーターンか否かのフラグ、trueでプレイヤーターン
   * @return アニメーション
   */
  show(isPlayerTurn: boolean): Animate {
    return all(
      show(isPlayerTurn, this.#model),
      onStart(() => {
        waiting(this.#model, this.#tweenGroup).loop();
      }),
    );
  }

  /**
   * 非表示にする
   * @return アニメーション
   */
  invisible(): Animate {
    return all(
      invisible(this.#model),
      onStart(() => {
        this.#tweenGroup.removeAll();
      }),
    );
  }

  /**
   * ターンインジケーターで使うthree.jsオブジェクトを返す
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
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
