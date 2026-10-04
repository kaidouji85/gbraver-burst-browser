import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { canBeatDown } from "./can-beat-down";
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
  const battery5 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 5,
  );
  const allBattery = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery,
  );
  const allBatteryMinusOne = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" &&
      v.battery === data.enemy.armdozer.battery - 1,
  );
  const canBeatDownWithAllBattery = canBeatDown(
    data.enemy,
    data.enemy.armdozer.battery,
    data.player,
    data.player.armdozer.battery,
  );

  if (burst && battery5) {
    return battery5;
  }

  if (pilot && battery5) {
    return battery5;
  }

  if (
    canBeatDownWithAllBattery &&
    !data.player.armdozer.enableBurst &&
    !data.player.pilot.enableSkill &&
    allBattery
  ) {
    return allBattery;
  }

  if (data.enemy.armdozer.battery === 0 && pilot) {
    return pilot;
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
  const pilot = data.commands.find((v) => v.type === "PILOT_SKILL_COMMAND");
  const burst = data.commands.find((v) => v.type === "BURST_COMMAND");
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );
  const allBattery = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery,
  );
  const isDefeatedWithBattery1 = canBeatDown(
    data.player,
    data.player.armdozer.battery,
    data.enemy,
    1,
  );
  const isDefeatedWithAllBattery = canBeatDown(
    data.player,
    data.player.armdozer.battery,
    data.enemy,
    data.enemy.armdozer.battery,
  );
  const isNotMaxBattery =
    data.enemy.armdozer.battery < data.enemy.armdozer.maxBattery;

  if (data.enemy.armdozer.battery === 0 && burst) {
    return burst;
  }

  if (data.enemy.armdozer.battery === 0 && pilot) {
    return pilot;
  }

  if (isDefeatedWithAllBattery && isNotMaxBattery && burst) {
    return burst;
  }

  if (isDefeatedWithAllBattery && isNotMaxBattery && pilot) {
    return pilot;
  }

  if (isDefeatedWithBattery1 && allBattery) {
    return allBattery;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * ベリーハードコース ウィングドーザ NPC
 *
 * @returns NPC
 */
export function veryHardWingDozerNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.WING_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
