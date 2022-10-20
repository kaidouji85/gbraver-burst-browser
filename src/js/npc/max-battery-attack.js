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
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1
  );
  return battery1 ?? ZERO_BATTERY;
};

/**
 * 全力攻撃、ウィングドーザNPC
 *
 * @return NPC
 */
export function maxBatteryAttackWingDozerNPC(): NPC {
  const armdozer =
    ArmDozers.find((v) => v.id === ArmDozerIds.WING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}

/**
 * 全力攻撃、シンブレイバーNPC
 *
 * @return NPC
 */
export function maxBatteryAttackShinBraverNPC(): NPC {
  const armdozer =
    ArmDozers.find((v) => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
