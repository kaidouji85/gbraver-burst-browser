import { Unsubscribable } from "rxjs";

import { appendChildToBody } from "./game-procedure/append-children-to-body";
import { createGameActionNotifier } from "./game-procedure/create-game-action-notifier";
import { initialize } from "./game-procedure/initialize";
import { onGameAction } from "./game-procedure/on-game-action";
import { onVisibilityChange } from "./game-procedure/on-visibility-change";
import { GameProps } from "./game-props";
import {
  GamePropsGeneratorParam,
  generateGameProps,
} from "./game-props/generate-game-props";

/** コンストラクタのパラメータ */
type Param = GamePropsGeneratorParam;

/** ゲーム管理オブジェクト */
export class Game {
  /** ゲームプロパティ */
  #props: GameProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#props = generateGameProps(param);
    appendChildToBody(this.#props);
    const gameActionNotifier = createGameActionNotifier(this.#props);
    this.#unsubscribers = [
      gameActionNotifier.subscribe((action) => {
        onGameAction(this.#props, action);
      }),
      this.#props.visibilityChange.subscribe(() => {
        onVisibilityChange();
      }),
    ];
  }

  /**
   * ゲームの初期化を行う
   * @return 処理が完了したら発火するPromise
   */
  async initialize(): Promise<void> {
    await initialize(this.#props);
  }
}
