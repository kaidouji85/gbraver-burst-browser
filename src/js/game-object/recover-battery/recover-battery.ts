import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { hidden, popUp, show } from "./animation/pop-up";
import { createInitialValue } from "./model/initial-value";
import type { RecoverBatteryModel } from "./model/recover-battery-model";
import { RecoverBatterySounds } from "./sounds/recover-battery-sounds";
import type { RecoverBatteryView } from "./view/recover-battery-view";

/**
 * コンストラクタのパラメータ
 */
type Param = {
  /** ビュー */
  view: RecoverBatteryView;

  /** リソース管理オブジェクト */
  resources: Resources;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * バッテリー回復
 */
export class RecoverBattery {
  #model: RecoverBatteryModel;
  #view: RecoverBatteryView;
  #sounds: RecoverBatterySounds;
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#model = createInitialValue();
    this.#view = param.view;
    this.#sounds = new RecoverBatterySounds(param.resources);
    this.#unsubscriber = param.gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#update();
      } else if (action.type === "PreRender") {
        this.#preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * 回復バッテリーを一定時間表示する
   *
   * @param value バッテリー回復量
   * @return アニメーション
   */
  popUp(value: number): Animate {
    return popUp(this.#model, this.#sounds, value);
  }

  /**
   * 表示
   *
   * @param value バッテリー回復量
   * @return アニメーション
   */
  show(value: number): Animate {
    return show(this.#model, this.#sounds, value);
  }

  /**
   * 非表示
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
   * ゲームオブジェクト状態更新
   */
  #update(): void {
    this.#view.engage(this.#model);
  }

  /**
   * プリレンダ
   *
   * @param action アクション
   */
  #preRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
