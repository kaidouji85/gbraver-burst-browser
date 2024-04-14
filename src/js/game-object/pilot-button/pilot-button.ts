import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import { close } from "./animation/close";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import {
  createPilotButtonProps,
  GeneratePilotButtonPropsParams,
} from "./props/create-pilot-button-props";
import { PilotButtonProps } from "./props/pilot-button-props";

/** コンストラクタのパラメータ */
type Params = GeneratePilotButtonPropsParams;

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
  constructor(params: Params) {
    const { gameObjectAction } = params;
    this.#props = createPilotButtonProps(params);
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
      this.#props.view.notifyPressed().subscribe((event) => {
        this.#onPush(event);
      }),
    ];
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
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * パイロットボタン を表示する
   * @param canPilot ボタン利用フラグ、trueで利用可能
   * @return アニメーション
   */
  open(canPilot: boolean): Animate {
    return open(this.#props, canPilot);
  }

  /**
   * ボタンクリック
   * @return アニメーション
   */
  decide(): Animate {
    return decide(this.#props);
  }

  /**
   * パイロットボタンを非表示にする
   * @return アニメーション
   */
  close(): Animate {
    return close(this.#props);
  }

  /**
   * ボタン押下通知
   * @return 通知ストリーム
   */
  notifyPressed(): Observable<Event> {
    return this.#props.pushButton;
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
   * @return trueで操作不可能
   */
  isDisabled(): boolean {
    return this.#props.model.disabled;
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }

  /**
   * ボタン押下時の処理
   * @param event イベント
   */
  #onPush(event: Event): void {
    if (
      !this.#props.model.shouldPushNotifierStop &&
      !this.#props.model.disabled &&
      this.#props.model.canActivatePilotSkill
    ) {
      this.#props.pushButton.next(event);
    }
  }
}
