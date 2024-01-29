import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { GameObjectAction } from "../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import { ActiveArmdozerPointerModel } from "./model/active-armdozer-pointer-model";
import { createInitialValue } from "./model/create-initial-value";
import { ActiveArmdozerPointerView } from "./view/active-armdozer-pointer-view";

/** アクティブアームドーザポインター */
export class ActiveArmdozerPointer {
  /** モデル */
  #model: ActiveArmdozerPointerModel;
  /** ビュー */
  #view: ActiveArmdozerPointerView;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: ActiveArmdozerPointerView,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate();
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
   * シーンに追加するオブジェクトを返す
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * 表示する
   * @return アニメーション
   */
  show(): Animate {
    return show(this.#model);
  }

  /**
   * 消す
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#model);
  }

  /**
   * Update時の処理
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }
}
