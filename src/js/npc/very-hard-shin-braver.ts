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
  const pilot = data.commands.find((v) => v.type === "PILOT_SKILL_COMMAND");
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
  const canBeatDownWithAllBattery = canBeatDown(
    data.enemy,
    data.enemy.armdozer.battery,
    data.player,
    data.player.armdozer.battery,
  );

  if (pilot) {
    return pilot;
  }

  if (allBattery && burst) {
    return allBattery;
  }

  if (
    canBeatDownWithAllBattery &&
    !data.player.armdozer.enableBurst &&
    !data.player.pilot.enableSkill &&
    allBattery
  ) {
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
  const pilot = data.commands.find((v) => v.type === "PILOT_SKILL_COMMAND");
  const playerAllBattery = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" &&
      v.battery === data.player.armdozer.battery,
  );
  const battery3 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 3,
  );
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );
  const isDefeatedWithBattery3 = canBeatDown(
    data.player,
    data.player.armdozer.battery,
    data.enemy,
    3,
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

  if (data.enemy.armdozer.battery === 0 && burst) {
    return burst;
  }

  if (isDefeatedWithAllBattery && data.enemy.armdozer.battery < 5 && burst) {
    return burst;
  }

  if (isDefeatedWithAllBattery && pilot) {
    return pilot;
  }

  if (isDefeatedWithBattery3 && playerAllBattery) {
    return playerAllBattery;
  }

  if (isDefeatedWithBattery1 && playerAllBattery) {
    return playerAllBattery;
  }

  if (data.enemy.armdozer.battery === 5 && battery3) {
    return battery3;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * ベリーハードコース シンブレイバー NPC
 *
 * @returns NPC
 */
export function veryHardShinBraver(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
