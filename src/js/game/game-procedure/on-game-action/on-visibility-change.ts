import { Howler } from "howler";

import { isIPad } from "../../../device-ditect/is-ipad";
import { isIPhone } from "../../../device-ditect/is-iphone";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * VisibilityChange時の処理
 */
function onVisibilityChange(): void {
  // iPhone、iPadの場合はホーム画面から戻った場合に本イベントを検知しないため、何もしない
  if (isIPhone() || isIPad()) {
    return;
  }

  const shouldMute = document.visibilityState === "hidden";
  Howler.mute(shouldMute);
}

/** アクションタイプ */
const actionType = "VisibilityChange";

/** VisibilityChange時のイベントリスナーコンテナ */
export const visibilityChangeContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onVisibilityChange();
  },
};
