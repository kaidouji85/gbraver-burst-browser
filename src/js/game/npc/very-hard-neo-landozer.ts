import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
  totalCorrectPower,
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
  const hasCorrectPower = 0 < totalCorrectPower(data.enemy.armdozer.effects);

  if (burst && battery5) {
    return battery5;
  }

  if (hasCorrectPower && battery5) {
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
  const allBattery = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery,
  );
  const allBatteryMinusTwo = data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" &&
      v.battery === data.enemy.armdozer.battery - 2,
  );
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );
  const isDefeatedWithAllBattery = canBeatDown(
    data.player,
    data.player.armdozer.battery,
    data.enemy,
    data.enemy.armdozer.battery,
  );
  const isDefeatedWithAllBatteryMinusTwo = canBeatDown(
    data.player,
    data.player.armdozer.battery,
    data.enemy,
    data.enemy.armdozer.battery - 2,
  );
  const isDefeatedWithBattery1 = canBeatDown(
    data.player,
    data.player.armdozer.battery,
    data.enemy,
    1,
  );

  if (pilot) {
    return pilot;
  }

  if (isDefeatedWithAllBattery && data.enemy.armdozer.battery < 5 && burst) {
    return burst;
  }

  if (
    3 <= data.enemy.armdozer.battery &&
    isDefeatedWithAllBatteryMinusTwo &&
    allBattery
  ) {
    return allBattery;
  }

  if (isDefeatedWithBattery1 && allBattery) {
    return allBattery;
  }

  if (burst && data.enemy.armdozer.battery === 0) {
    return burst;
  }

  if (3 <= data.enemy.armdozer.battery && allBatteryMinusTwo) {
    return allBatteryMinusTwo;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * ベリーハードコース ネオランドーザ NPC
 *
 * @returns NPC
 */
export function veryHardNeoLandozer(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.NEO_LANDOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
