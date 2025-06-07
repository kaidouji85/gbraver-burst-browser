import { Howler } from "howler";

import { VisibilityChange } from "../../game-actions/visibility-change";
import { GameProps } from "../../game-props";

/**
 * visibilityState = "hidden" の場合の処理
 */
const onHidden = () => {
  Howler.mute(true);
};

/**
 * HowlerのAudioContextがsuspendedならWebAudioContextをresumeする
 *
 * この関数はトップレベルで宣言し、addEventListenerのコールバックとして直接渡すことで、
 * 同じ関数・同じオプションでの重複登録を防いでいる。
 *
 * MDN EventTarget: addEventListener() メソッドより引用
 * https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
 * > addEventListener() メソッドは、関数または handleEvent() 関数を実装したオブジェクトを、
 * > 呼び出される EventTarget における指定されたイベント種別のイベントリスナーのリストに加えることで動作します。
 * > その関数やオブジェクトが既にターゲットのイベントリスナーのリストにあった場合は、
 * > その関数やオブジェクトが二重に追加されることはありません。
 */
const resumeHowlerAudioContextOnTouch = () => {
  if (Howler.ctx.state === "suspended") {
    Howler.ctx.resume();
  }
};

/**
 * visibilityState = "visible" の場合の処理
 */
const onVisible = () => {
  Howler.mute(false);
  // iPad、iPhoneなどのタッチデバイスではHome画面からの復帰時に
  // WebAudioContextがsuspended状態になることがある。
  // しかしユーザーインタラクションがないとWebAudioContextはresumeされないため、
  // touchstartイベント(iPad、iPhoneではユーザーインタラクションと見なされる)でresumeする。
  document.addEventListener("touchstart", resumeHowlerAudioContextOnTouch, {
    once: true,
    capture: true,
  });
};

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: VisibilityChange;
};

/**
 * VisibilityChange時の処理
 * @param options オプション
 */
export function onVisibilityChange(
  options: Options, // eslint-disable-line @typescript-eslint/no-unused-vars
): void {
  if (document.visibilityState === "hidden") {
    onHidden();
  } else {
    onVisible();
  }
}
