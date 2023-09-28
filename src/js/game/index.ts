import { map, Observable, Unsubscribable } from "rxjs";

import { GameAction } from "./game-actions";
import { initialize } from "./game-procedure/initialize";
import { onGameAction } from "./game-procedure/on-game-action";
import { onVisibilityChange } from "./game-procedure/on-visibility-change";
import {
  GameProps,
  GamePropsGeneratorParam,
  generateGameProps,
} from "./game-props/game-props";

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
    const body = document.body || document.createElement("div");
    const elements = [
      this.#props.fader.getRootHTMLElement(),
      this.#props.interruptScenes.getRootHTMLElement(),
      this.#props.domDialogBinder.getRootHTMLElement(),
      this.#props.domSceneBinder.getRootHTMLElement(),
      this.#props.domFloaters.getRootHTMLElement(),
      this.#props.renderer.getRendererDOM(),
      ...this.#props.tdBinder.getDOMLayerElements(),
    ];
    elements.forEach((element) => {
      body.appendChild(element);
    });
    const suddenlyBattleEnd: Observable<GameAction> =
      this.#props.suddenlyBattleEnd.stream().pipe(
        map(() => ({
          type: "SuddenlyBattleEnd",
        })),
      );
    const webSocketAPIError: Observable<GameAction> = this.#props.api
      .websocketErrorNotifier()
      .pipe(
        map((error) => ({
          type: "WebSocketAPIError",
          error,
        })),
      );

    const gameActionStreams: Observable<GameAction>[] = [
      this.#props.tdBinder.gameActionNotifier(),
      this.#props.domSceneBinder.gameActionNotifier(),
      this.#props.domDialogBinder.gameActionNotifier(),
      this.#props.domFloaters.gameActionNotifier(),
      suddenlyBattleEnd,
      webSocketAPIError,
    ];
    this.#unsubscribers = [
      ...gameActionStreams.map((v) =>
        v.subscribe((action) => {
          onGameAction(this.#props, action);
        }),
      ),
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
