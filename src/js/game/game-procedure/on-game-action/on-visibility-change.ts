import { Howler } from "howler";

import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * VisibilityChange時の処理
 */
function onVisibilityChange(): void {
  const shouldMute = document.visibilityState === "hidden";
  Howler.mute(shouldMute);
}

/** アクションタイプ */
const actionType = "VisibilityChange";

/** VisibilityChange時のイベントリスナーコンテナ */
export const visibilityChangeContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onVisibilityChange();
    }
  },
};
