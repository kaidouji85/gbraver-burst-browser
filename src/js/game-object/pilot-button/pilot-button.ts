import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { close } from "./animation/close";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import { bindEventListener } from "./procedure/bind-event-listner";
import { notifyPressed } from "./procedure/notify-pressed";
import {
  createPilotButtonProps,
  PropsCreatorParams,
} from "./props/create-pilot-button-props";
import { PilotButtonProps } from "./props/pilot-button-props";

/** コンストラクタのパラメータ */
type PilotButtonParams = PropsCreatorParams;

/** パイロットボタン */
export class PilotButton {
  /** プロパティ */
  #props: PilotButtonProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PilotButtonParams) {
    const { gameObjectAction } = params;
    this.#props = createPilotButtonProps(params);
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
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * パイロットボタン を表示する
   * @param canPilot ボタン利用フラグ、trueで利用可能
   * @returns アニメーション
   */
  open(canPilot: boolean): Animate {
    return open(this.#props, canPilot);
  }

  /**
   * ボタンクリック
   * @returns アニメーション
   */
  decide(): Animate {
    return decide(this.#props);
  }

  /**
   * パイロットボタンを非表示にする
   * @returns アニメーション
   */
  close(): Animate {
    return close(this.#props);
  }

  /**
   * ボタン押下通知
   * @returns 通知ストリーム
   */
  notifyPressed(): Observable<Event> {
    return notifyPressed(this.#props);
  }

  /**
   * パイロットボタンが操作不可能であるか否かを設定する
   * @param isDisabled trueで操作不可能
   */
  disabled(isDisabled: boolean): void {
    this.#props.model.disabled = isDisabled;
  }

  /**
   * パイロットボタンが操作不可能であるか否かを取得する
   * @returns trueで操作不可能
   */
  isDisabled(): boolean {
    return this.#props.model.disabled;
  }
}
