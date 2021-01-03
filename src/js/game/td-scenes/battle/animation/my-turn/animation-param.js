// @flow

import type {TDArmdozerObjects} from "../../view/td/armdozer-objects/armdozer-objects";
import type {TDPlayer} from "../../view/td/player";
import type {HUDArmdozerObjects} from "../../view/hud/armdozer-objects/hud-armdozer-ibjects";
import {TDCamera} from "../../../../../game-object/camera/td";
import {HUDPlayer} from "../../view/hud/player";

/**
 * マイターン アニメーションパラメータ
 *
 * @type TD_ARMDOZER 3Dレイヤー アームドーザ
 * @type HUD_ARMDOZER HUDレイヤー アームドーザ
 */
export type MyTurnAnimationParamX<TD_ARMDOZER: TDArmdozerObjects, HUD_ARMDOZER: HUDArmdozerObjects> = {
  tdArmdozer: TD_ARMDOZER,
  hudArmdozer: HUD_ARMDOZER,
  tdPlayer: TDPlayer,
  hudPlayer: HUDPlayer,
  tdCamera: TDCamera,
};

/**
 * マイターン アニメーションパラメータ
 */
export type MyTurnAnimationParam = MyTurnAnimationParamX<TDArmdozerObjects, HUDArmdozerObjects>;
