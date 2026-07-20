import { GameObjectActionContainer } from "../action/game-object-action-container";
import { HUD_FROMTMOST_FADER_Z, HUD_REARMOST_FADER_Z } from "../hud-position";
import { Fader } from "./fader";
import { PlaneFaderView } from "./view/plane-fader-view";

/**
 * 最前面画面フェーダ
 * @param options オプション
 * @param options.gameObjectAction ゲームオブジェクトアクション
 * @param options.isVisible 表示フラグ、trueで表示する
 * @returns 画面フェーダ
 */
export function frontmostFader(
  options: GameObjectActionContainer & {
    isVisible: boolean;
  },
): Fader {
  const { isVisible, gameObjectAction } = options;
  const view = new PlaneFaderView(HUD_FROMTMOST_FADER_Z);
  return new Fader({
    isVisible,
    gameObjectAction,
    view,
  });
}

/**
 * 最背面画面フェーダ
 * @param options オプション
 * @param options.gameObjectAction ゲームオブジェクトアクション
 * @param options.isVisible 表示フラグ、trueで表示する
 * @returns 画面フェーダ
 */
export function rearmostFader(
  options: GameObjectActionContainer & {
    isVisible: boolean;
  },
): Fader {
  const { isVisible, gameObjectAction } = options;
  const view = new PlaneFaderView(HUD_REARMOST_FADER_Z);
  return new Fader({
    isVisible,
    gameObjectAction,
    view,
  });
}
