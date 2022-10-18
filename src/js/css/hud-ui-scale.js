// @flow
import {HUDUIScale} from "../game-object/scale";
import {createSafeAreaInset} from "../safe-area/safe-area-inset";
import type {Stream, Unsubscriber} from "../stream/stream";
import type {Resize} from "../window/resize";

/** cssカスタムプロパティ --hud-ui-scale */
const HUD_UI_SCALE = '--hud-ui-scale';

/**
 * --hud-ui-scaleに値をセットするヘルパー関数
 *
 * @param value 設定値
 */
function setHUDUIScale(value: number) {
  if (document.documentElement) {
    document.documentElement.style.setProperty(HUD_UI_SCALE, `${value}`);
  }
}

/** cssカスタムプロパティ --hud-ui-scaleを生成する */
export class CssHUDUIScale {
  /** レンダラHTML要素 */
  #rendererDOM: HTMLElement;
  /** アンサブスクライバー */
  #unsubscriver: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param rendererDOM レンダラHTML要素
   * @param resize リサイズ
   */
  constructor(rendererDOM: HTMLElement, resize: Stream<Resize>) {
    this.#rendererDOM = rendererDOM;
    const scale = HUDUIScale(rendererDOM, createSafeAreaInset());
    setHUDUIScale(scale);
    this.#unsubscriver = resize.subscribe(action => {
      this.#onResize(action);
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscriver.unsubscribe();
  }

  /**
   * リサイズ時の処理
   *
   * @param action アクション
   */
  #onResize(action: Resize): void {
    const scale = HUDUIScale(this.#rendererDOM, action.safeAreaInset);
    setHUDUIScale(scale);
  }
}