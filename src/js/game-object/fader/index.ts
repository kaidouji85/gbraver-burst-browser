import { Observable } from "rxjs";

import type { GameObjectAction } from "../action/game-object-action";
import {
  HUD_FROMTMOST_FADER_ZINDEX,
  HUD_REARMOST_FADER_ZINDEX,
} from "../hud-zindex";
import { Fader } from "./fader";

/** 画面フェーダ生成のパラメータ */
type Param = {
  /** 表示フラグ、trueで表示する */
  isVisible: boolean;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * 最前面画面フェーダ
 *
 * @param param パラメータ
 * @returns 画面フェーダ
 */
export function frontmostFader(param: Param): Fader {
  return new Fader({
    isVisible: param.isVisible,
    gameObjectAction: param.gameObjectAction,
    z: HUD_FROMTMOST_FADER_ZINDEX,
  });
}

/**
 * 最背面画面フェーダ
 *
 * @param param パラメータ
 * @returns 画面フェーダ
 */
export function rearmostFader(param: Param): Fader {
  return new Fader({
    isVisible: param.isVisible,
    gameObjectAction: param.gameObjectAction,
    z: HUD_REARMOST_FADER_ZINDEX,
  });
}
