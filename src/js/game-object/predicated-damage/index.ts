import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { GameObjectAction } from "../action/game-object-action";
import { hidden } from "./animation/hidden";
import { popBattleSimulatorIcon } from "./animation/pop-battle-simulator-icon";
import { show } from "./animation/show";
import { bindEventListener } from "./procedure/bind-event-listener";
import { notifyPush } from "./procedure/notify-push";
import {
  createPredicatedDamageProps,
  PredicatedDamagePropsCreatorParams,
} from "./props/create-predicated-damage-props";
import { PredicatedDamageProps } from "./props/predicated-damage-props";

/** コンストラクタのパラメータ */
export type PredicatedDamageConstructParams =
  PredicatedDamagePropsCreatorParams & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/** ダメージ予想 */
export class PredicatedDamage {
  /** プロパティ */
  #props: PredicatedDamageProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PredicatedDamageConstructParams) {
    this.#props = createPredicatedDamageProps(params);
    this.#unsubscribers = bindEventListener({
      ...params,
      props: this.#props,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * 表示
   * @param damage ダメージ
   * @returns アニメーション
   */
  show(damage: number): Animate {
    return show(this.#props, damage);
  }

  /**
   * 非表示
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
  }

  /**
   * バトルシュミレーターアイコンをポップさせる
   * @returns アニメーション
   */
  popBattleSimulatorIcon(): Animate {
    return popBattleSimulatorIcon(this.#props);
  }

  /**
   * 押下通知
   * @returns 通知ストリーム
   */
  notifyPush(): Observable<Event> {
    return notifyPush(this.#props);
  }

  /**
   * 操作不可能フラグを設定する
   * @param isDisabled trueで操作不可能となる
   */
  disabled(isDisabled: boolean): void {
    this.#props.disabled = isDisabled;
  }

  /**
   * 操作不可能か否かを取得する
   * @returns 判定結果、trueで操作不可能
   */
  isDisabled(): boolean {
    return this.#props.disabled;
  }
}
