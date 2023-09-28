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
    this.#props.gameAction.subscribe((action) => {
      onGameAction(this.#props, action);
    });
    this.#props.visibilityChange.subscribe(() => {
      onVisibilityChange();
    });
  }

  /**
   * ゲームの初期化を行う
   * @return 処理が完了したら発火するPromise
   */
  async initialize(): Promise<void> {
    await initialize(this.#props);
  }
}
