// @flow

import type {Resources} from "../../../../../../resource";
import type {HUDPlayer} from "./index";
import type {CutIn} from "../../../../../../game-object/cut-in/cut-in";
import {ShinBraverCutIn} from "../../../../../../game-object/cut-in/shin-braver/shin-braver-cut-in";
import type {Player} from "gbraver-burst-core/lib/player/player";

/**
 * 敵側HUDを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyHUD(resources: Resources, state: Player): HUDPlayer<CutIn> {
  return {
    playerId: state.playerId,
    cutIn: new ShinBraverCutIn(resources)
  };
}
