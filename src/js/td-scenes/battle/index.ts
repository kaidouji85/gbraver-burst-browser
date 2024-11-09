import { Observable, Unsubscribable } from "rxjs";

import { TDScene } from "../td-scene";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  BattleScenePropsCreatorParams,
  createBattleSceneProps,
} from "./procedure/create-battle-scene-props";
import { start } from "./procedure/start";
import { BattleEnd, BattleSceneProps } from "./props";

/** コンストラクタのパラメータ */
type BattleSceneParams = BattleScenePropsCreatorParams & {
  /** 緊急停止通知ストリーム */
  emergencyStop?: Observable<unknown>;
};

/** 戦闘シーン */
export class BattleScene implements TDScene {
  /** プロパティ */
  #props: BattleSceneProps;
  /** アンサブスクライバ */
  #unSubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @params params パラメータ
   */
  constructor(params: BattleSceneParams) {
    this.#props = createBattleSceneProps(params);
    const emergencyStopUnSubscriber = params.emergencyStop
      ? [
          params.emergencyStop.subscribe(() => {
            this.#onEmergencyStop();
          }),
        ]
      : [];
    this.#unSubscribers = [
      ...bindEventListeners(this.#props),
      ...emergencyStopUnSubscriber,
    ];
  }

  /** @override */
  destructor(): void {
    this.#props.view.destructor();
    this.#unSubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getDOMLayerElements(): HTMLElement[] {
    return this.#props.view.dom.getHTMLElements();
  }

  /**
   * ゲーム終了通知
   * @returns 通知ストリーム
   */
  notifyGameEnd(): Observable<BattleEnd> {
    return this.#props.endBattle;
  }

  /**
   * プレイヤーによるゲーム強制終了の通知
   * @returns 通知ストリーム
   */
  notifyForceGameEnd(): Observable<void> {
    return this.#props.forceEndBattle;
  }

  /**
   * プレイヤーによるゲーム強制リトライの通知
   * @returns 通知ストリーム
   */
  notifyForceRetry(): Observable<void> {
    return this.#props.forceRetry;
  }

  /**
   * 戦闘シーンを開始する
   * 画面遷移などが完了したら、本メソッドを呼ぶ想定
   * @returns 処理が完了したら発火するPromise
   */
  async start(): Promise<void> {
    await start(this.#props);
  }

  /**
   * 緊急停止時の処理
   */
  #onEmergencyStop(): void {
    this.#unSubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#unSubscribers = [];
  }
}
