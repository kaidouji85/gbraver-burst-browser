import { appendChildrenToBody } from "./game-procedure/append-children-to-body";
import { createGameActionNotifier } from "./game-procedure/create-game-action-notifier";
import { initialize } from "./game-procedure/initialize";
import { onGameAction } from "./game-procedure/on-game-action";
import { GameProps } from "./game-props";
import {
  GamePropsGeneratorParams,
  generateGameProps,
} from "./game-props/generate-game-props";

/** コンストラクタのパラメータ */
type GameParam = GamePropsGeneratorParams;

/** ゲーム管理オブジェクト */
export class Game {
  /** ゲームプロパティ */
  #props: GameProps;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: GameParam) {
    this.#props = generateGameProps(param);
    appendChildrenToBody(this.#props);
    const gameActionNotifier = createGameActionNotifier(this.#props);
    gameActionNotifier.subscribe((action) => {
      onGameAction(this.#props, action);
    });
  }

  /**
   * ゲームの初期化を行う
   * @returns 処理が完了したら発火するPromise
   */
  async initialize(): Promise<void> {
    await initialize(this.#props);
  }
}
