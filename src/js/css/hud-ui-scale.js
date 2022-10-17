// @flow
import type {PreRender} from "../game-loop/pre-render";
import {HUDUIScale} from "../game-object/scale";
import type {Stream, Unsubscriber} from "../stream/stream";

/** cssカスタムプロパティ --hud-ui-scale */
const HUD_UI_SCALE = '--hud-ui-scale';

/** cssカスタムプロパティ --hud-ui-scaleを生成する */
export class CssHUDUIScale {
  /** アンサブスクライバー */
  #unsubscriver: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param preRender プリレンダー
   */
  constructor(preRender: Stream<PreRender>) {
    this.#unsubscriver = preRender.subscribe(action => {
      this.#onPreRender(action);
    });
  }

  /**
   * プリレンダー時の処理
   *
   * @param preRender プリレンダー
   */
  #onPreRender(preRender: PreRender): void {
    const scale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);
    if (document.documentElement) {
      document.documentElement.style.setProperty(HUD_UI_SCALE, `${scale}`);
    }
  }
}