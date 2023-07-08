import {
  ArmDozerIds,
  ArmDozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import type { NPC } from "./npc";
import type { SimpleRoutine } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = {
  type: "BATTERY_COMMAND",
  battery: 0,
};

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  const burst = data.commands.find((v) => v.type === "BURST_COMMAND");
  const pilot = data.commands.find((v) => v.type === "PILOT_SKILL_COMMAND");
  const maxBattery = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery,
  );

  if (!burst && pilot) {
    return pilot;
  }

  return maxBattery ?? ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const burst = data.commands.find((v) => v.type === "BURST_COMMAND");
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );
  return burst ?? battery1 ?? ZERO_BATTERY;
};

/**
 * パイロットスキルチュートリアル用ウィングドーザNPC
 * @return NPC
 */
export function pilotSkillTutorialNPC(): NPC {
  const armdozer =
    ArmDozers.find((v) => v.id === ArmDozerIds.WING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
