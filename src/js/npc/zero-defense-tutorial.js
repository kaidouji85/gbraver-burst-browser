// @flow
import { ArmDozerIds, ArmDozers, PilotIds, Pilots } from "gbraver-burst-core";

import type { NPC } from "./npc";
import type { SimpleRoutine } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY = {
  type: "BATTERY_COMMAND",
  battery: 0,
};

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  const maxBattery = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery
  );
  return maxBattery ?? ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const battery3 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 3
  );
  return battery3 ?? ZERO_BATTERY;
};

/**
 * ゼロ防御チュートリアル用ネオランドーザNPC
 *
 * @return NPC
 */
export function zeroDefenseTutorialNPC(): NPC {
  const armdozer =
    ArmDozers.find((v) => v.id === ArmDozerIds.NEO_LANDOZER) ?? ArmDozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
