// @flow
import type {Stream} from "../stream/core";
import type {GameAction} from "./actions/game-actions";
import type {Battle} from "@gbraver-burst-network/browser-core";
import {map} from "../stream/operator";
import {toStream} from "../stream/rxjs";

/**
 * バトル管理オブジェクトからバトル強制終了ストリームを取り出す
 * 本関数はGameでのみ利用することを想定している
 * Game内で扱いやすいように、ストリームデータ型がSuddenlyBattleEndではなくGameActionとなっている
 * 
 * @param battle バトル管理オブジェクト
 * @return 通知ストリーム
 */
export function toSuddenlyBattleEnd(battle: Battle): Stream<GameAction> {
  return toStream(battle.suddenlyBattleNotifier())
    .chain(map(() => ({type: 'SuddenlyBattleEnd'})));
}