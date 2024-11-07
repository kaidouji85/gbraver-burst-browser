import {
  ArmdozerId,
  Armdozers,
  PilotId,
  Pilots,
  PlayerId,
} from "gbraver-burst-core";

import { NPCBattleState } from "./npc-battle-state";
import { NPCBattleStage } from "./stages/npc-battle-stage";

/**
 * NPCバトル開始直後のステートを生成する
 * @param playerId プレイヤーID
 * @param armdozerId プレイヤーが選択したアームドーザID
 * @param pilotId プレイヤーが選択したパイロットID
 * @param stages 全ステージ
 * @returns NPCバトルステート
 */
export function createNPCBattleState(
  playerId: PlayerId,
  armdozerId: ArmdozerId,
  pilotId: PilotId,
  stages: NPCBattleStage[],
): NPCBattleState {
  const armdozer = Armdozers.find((v) => v.id === armdozerId) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === pilotId) ?? Pilots[0];
  const player = {
    playerId,
    armdozer,
    pilot,
  };
  return {
    player,
    stages: stages,
    stageIndex: 0,
  };
}
