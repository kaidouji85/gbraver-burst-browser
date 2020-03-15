// @flow

import type {HUDPlayer} from "./index";
import type {Resources} from "../../../../../../resource";
import {ShinBraverCutIn} from "../../../../../../game-object/cut-in/shin-braver/shin-braver-cutin";
import type {CutIn} from "../../../../../../game-object/cut-in/cut-in";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";

/**
 * プレイヤー側のHUDを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): HUDPlayer<CutIn> {
  return {
    playerId: state.playerId,
    cutIn: new ShinBraverCutIn(resources, listener)
  };
}