import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createNPCBattleState } from "../../../../src/js/game/npc-battle/create-npc-battle-state";
import { DefaultStage } from "../../../../src/js/game/npc-battle/stages/npc-battle-stages";

test("NPCバトルステートを正しく作ることができる", () => {
  const playerId = "test-player";
  const armdozerId = ArmdozerIds.SHIN_BRAVER;
  const pilotId = PilotIds.TSUBASA;
  const stages = [DefaultStage, DefaultStage, DefaultStage];
  expect(createNPCBattleState(playerId, armdozerId, pilotId, stages)).toEqual({
    player: {
      playerId,
      armdozer: Armdozers.find((v) => v.id === armdozerId),
      pilot: Pilots.find((v) => v.id === pilotId),
    },
    stages,
    stageIndex: 0,
  });
});
