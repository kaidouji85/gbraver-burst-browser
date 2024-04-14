import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { hidden, popUp, show } from "./animation/pop-up";
import type { RecoverBatteryView } from "./view/recover-battery-view";
import {RecoverBatteryProps} from "./props/recover-battery-props";
import {createRecoverBatteryProps} from "./props/create-recover-battery-props";

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
  /** プロパティ */
  #props: RecoverBatteryProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#props = createRecoverBatteryProps(param);
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
    this.#props.view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * 回復バッテリーを一定時間表示する
   *
   * @param value バッテリー回復量
   * @return アニメーション
   */
  popUp(value: number): Animate {
    return popUp(this.#props.model, this.#props.sounds, value);
  }

  /**
   * 表示
   *
   * @param value バッテリー回復量
   * @return アニメーション
   */
  show(value: number): Animate {
    return show(this.#props.model, this.#props.sounds, value);
  }

  /**
   * 非表示
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props.model);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * ゲームオブジェクト状態更新
   */
  #update(): void {
    this.#props.view.engage(this.#props.model);
  }

  /**
   * プリレンダ
   *
   * @param action アクション
   */
  #preRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
