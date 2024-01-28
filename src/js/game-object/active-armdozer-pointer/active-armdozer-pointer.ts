import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { GameObjectAction } from "../action/game-object-action";
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
   * Update時の処理
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }
}
