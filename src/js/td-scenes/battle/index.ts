import { Observable, Unsubscribable } from "rxjs";

import type { TDScene } from "../td-scene";
import type {
  BattleEnd,
  BattleSceneProps,
  BattleScenePropsCreatorParams,
} from "./battle-scene-props";
import { createBattleSceneProps } from "./battle-scene-props";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { start } from "./procedure/start";

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
   * @return 通知ストリーム
   */
  gameEndNotifier(): Observable<BattleEnd> {
    return this.#props.endBattle;
  }

  /**
   * 戦闘シーンを開始する
   * 画面遷移などが完了したら、本メソッドを呼ぶ想定
   * @return 処理が完了したら発火するPromise
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
  }
}
