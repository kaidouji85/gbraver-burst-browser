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
type BattleSceneParams = BattleScenePropsCreatorParams;

/** 戦闘シーン */
export class BattleScene implements TDScene {
  #props: BattleSceneProps;
  #unsubscriber: Unsubscribable[];

  /**
   * コンストラクタ
   * @params params パラメータ
   */
  constructor(params: BattleSceneParams) {
    this.#props = createBattleSceneProps(params);
    this.#unsubscriber = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscriber.forEach((v) => {
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
}
