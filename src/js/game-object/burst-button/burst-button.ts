import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { close } from "./animation/close";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import { bindEventListener } from "./procedure/bind-event-listener";
import { notifyPressed } from "./procedure/notify-pressed";
import { BurstButtonProps } from "./props/burst-button-props";
import {
  createBurstButtonProps,
  PropsCreatorParams,
} from "./props/create-burst-button-props";

/** コンストラクタのパラメータ */
type BurstButtonParams = PropsCreatorParams;

/** バーストボタン */
export class BurstButton {
  /** プロパティ */
  #props: BurstButtonProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: BurstButtonParams) {
    const { gameObjectAction } = params;
    this.#props = createBurstButtonProps(params);
    this.#unsubscribers = bindEventListener(this.#props, gameObjectAction);
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
   * ボタンを表示する
   * @param canBurst バースト可能フラグ、trueでバースト可能
   * @returns アニメーション
   */
  open(canBurst: boolean): Animate {
    return open(this.#props, canBurst);
  }

  /**
   * 決定アニメーション
   * @returns アニメーション
   */
  decide(): Animate {
    return decide(this.#props);
  }

  /**
   * ボタンを非表示にする
   * @returns アニメーション
   */
  close(): Animate {
    return close(this.#props);
  }

  /**
   * three.jsオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * ボタン押下通知
   * @returns 通知ストリーム
   */
  notifyPressed(): Observable<Event> {
    return notifyPressed(this.#props);
  }

  /**
   * 操作不可能、可能を設定する
   * @param isDisabled trueで操作不可能
   */
  disabled(isDisabled: boolean): void {
    this.#props.model.disabled = isDisabled;
  }

  /**
   * 操作不可能であるか否かを判定する
   * @returns trueで操作不可能
   */
  isDisabled(): boolean {
    return this.#props.model.disabled;
  }
}
