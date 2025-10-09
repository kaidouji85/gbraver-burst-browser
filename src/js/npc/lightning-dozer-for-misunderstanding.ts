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
  const battery5 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 5,
  );
  const allBatteryMinusOne = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" &&
      v.battery === data.enemy.armdozer.battery - 1,
  );
  const burst = data.commands.find((v) => v.type === "BURST_COMMAND");

  if (battery5 && burst) {
    return battery5;
  }

  if (allBatteryMinusOne) {
    return allBatteryMinusOne;
  }

  return ZERO_BATTERY;
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
  const battery3 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 3,
  );

  if (data.enemy.armdozer.battery === 5 && burst && battery3) {
    return battery3;
  }

  if (burst) {
    return burst;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * ライトニングドーザ（エピソード「すれちがい」）
 *
 * @returns NPC
 */
export function lightningDozerNPCForMisunderstanding(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.LIGHTNING_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
