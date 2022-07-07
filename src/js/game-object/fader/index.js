// @flow

import type {Stream} from "../../stream/stream";
import {HUD_FROMTMOST_FADER_ZINDEX, HUD_REARMOST_FADER_ZINDEX} from "../hud-zindex";
import type {GameObjectAction} from "../action/game-object-action";
import {Fader} from "./fader";

/** 画面フェーダ生成のパラメータ */
type Param = {
  /** 表示フラグ、trueで表示する */
  isVisible: boolean,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>
};

/**
 * 最前面画面フェーダ
 *
 * @param param パラメータ
 * @return 画面フェーダ
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
 * @return 画面フェーダ
 */
export function rearmostFader(param: Param): Fader {
  return new Fader({
    isVisible: param.isVisible,
    gameObjectAction: param.gameObjectAction,
    z: HUD_REARMOST_FADER_ZINDEX,
  });
}