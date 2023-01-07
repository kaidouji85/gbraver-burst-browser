import { map } from "../stream/operator";
import type {Stream, Unsubscriber} from "../stream/stream";
import { createStream } from "../stream/stream";
import { initialize } from "./game-procedure/initialize";
import { onGameAction } from "./game-procedure/on-game-action";
import type { GameProps, GamePropsGeneratorParam } from "./game-props";
import { generateGameProps } from "./game-props";
import {GameAction} from "./game-actions";

/** コンストラクタのパラメータ */
type Param = GamePropsGeneratorParam;

/** ゲーム管理オブジェクト */
export class Game {
  #props: GameProps;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#props = generateGameProps(param);
    const body = document.body || document.createElement("div");
    const elements = [this.#props.fader.getRootHTMLElement(), this.#props.interruptScenes.getRootHTMLElement(), this.#props.domDialogBinder.getRootHTMLElement(), this.#props.domSceneBinder.getRootHTMLElement(), this.#props.domFloaters.getRootHTMLElement(), this.#props.renderer.getRendererDOM(), ...this.#props.tdBinder.getDOMLayerElements()];
    elements.forEach(element => {
      body.appendChild(element);
    });
    const suddenlyBattleEnd: Stream<GameAction> = this.#props.suddenlyBattleEnd.stream().chain(map(() => ({
      type: "SuddenlyBattleEnd"
    })));
    const webSocketAPIError: Stream<GameAction> = createStream(this.#props.api.websocketErrorNotifier()).chain(map(error => ({
      type: "WebSocketAPIError",
      error
    })));
    const WebSocketAPIUnintentionalClose: Stream<GameAction> = createStream(this.#props.api.websocketUnintentionalCloseNotifier()).chain(map(error => ({
      type: "WebSocketAPIUnintentionalClose",
      error
    })));
    const gameActionStreams: Stream<GameAction>[] = [this.#props.tdBinder.gameActionNotifier(), this.#props.domSceneBinder.gameActionNotifier(), this.#props.domDialogBinder.gameActionNotifier(), this.#props.domFloaters.gameActionNotifier(), suddenlyBattleEnd, webSocketAPIError, WebSocketAPIUnintentionalClose];
    this.#unsubscribers = gameActionStreams.map(v => v.subscribe(action => {
      onGameAction(this.#props, action);
    }));
  }

  /**
   * ゲームの初期化を行う
   *
   * @return 処理が完了したら発火するPromise
   */
  async initialize(): Promise<void> {
    await initialize(this.#props);
  }

}