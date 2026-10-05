import {
  ArmdozerIds,
  Armdozers,
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
  const allBattery = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery,
  );

  if (burst) {
    return burst;
  }

  return allBattery ?? ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );
  return battery1 ?? ZERO_BATTERY;
};

/**
 * バースト+5攻撃 ネオランドーザNPC
 *
 * @returns NPC
 */
export function burstAttack5NeoLandozer(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.NEO_LANDOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
