// @flow

import {Fader} from "./fader";
import {Observable} from "rxjs";
import {HUD_FROMTMOST_FADER_ZINDEX, HUD_REARMOST_FADER_ZINDEX} from "../../zindex/hud-zindex";
import type {GameObjectAction} from "../action/game-object-action";

/** 画面フェーダ生成のパラメータ */
type Param = {
  isVisible: boolean,
  listener: Observable<GameObjectAction>
};

/**
 * 画面フェーダ 最前面
 *
 * @param param パラメータ
 * @return 生成した画面フェーダ
 */
export function frontmostFader(param: Param): Fader {
  return new Fader({
    isVisible: param.isVisible,
    listener: param.listener,
    z: HUD_FROMTMOST_FADER_ZINDEX,
  });
}

/**
 * 画面フェーダ 最背面
 *
 * @param param パラメータ
 * @return 生成した画面フェーダ
 */
export function rearmostFader(param: Param): Fader {
  return new Fader({
    isVisible: param.isVisible,
    listener: param.listener,
    z: HUD_REARMOST_FADER_ZINDEX,
  });
}