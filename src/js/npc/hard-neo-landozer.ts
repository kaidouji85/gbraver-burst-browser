import {
  ArmdozerIds,
  Armdozers,
  Command,
  correctPower,
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
  const allBatteryMinusOne = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" &&
      v.battery === data.enemy.armdozer.battery - 1,
  );
  const hasPlusCorrectPower = 0 < correctPower(data.enemy.armdozer.effects);
  const hasDamaged = data.enemy.armdozer.hp < data.enemy.armdozer.maxHp;

  if (hasDamaged && burst) {
    return burst;
  }

  if (hasPlusCorrectPower && allBattery) {
    return allBattery;
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
  const allBattery = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery,
  );
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );

  if (data.enemy.armdozer.battery === 0 && burst) {
    return burst;
  }

  if (burst && allBattery) {
    return allBattery;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * ハードコース ネオランドーザNPC
 *
 * @returns NPC
 */
export function hardNeoLandozer(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.NEO_LANDOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
