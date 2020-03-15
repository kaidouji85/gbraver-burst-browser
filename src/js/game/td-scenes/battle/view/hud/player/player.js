// @flow

import type {HUDPlayer} from "./index";
import type {Resources} from "../../../../../../resource";
import {ShinBraverCutIn} from "../../../../../../game-object/cut-in/shin-braver/shin-braver-cut-in";
import type {CutIn} from "../../../../../../game-object/cut-in/cut-in";
import type {Player} from "gbraver-burst-core/lib/player/player";

/**
 * プレイヤー側のHUDを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerHUD(resources: Resources, state: Player): HUDPlayer<CutIn> {
  return {
    playerId: state.playerId,
    cutIn: new ShinBraverCutIn(resources)
  };
}