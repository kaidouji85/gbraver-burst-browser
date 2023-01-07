import { ArmDozerIds, ArmDozers, PilotIds, Pilots } from "gbraver-burst-core";
import { canBeatDown } from "./can-beat-down";
import type { NPC } from "./npc";
import type { SimpleRoutine } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY = {
  type: "BATTERY_COMMAND",
  battery: 0
};

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = data => {
  const burst = data.commands.find(v => v.type === "BURST_COMMAND");
  const allBattery = data.commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery);
  const allBatteryMinusOne = data.commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery - 1);
  const canBeatDownWithAllBattery = canBeatDown(data.enemy, data.enemy.armdozer.battery, data.player, data.player.armdozer.battery);

  if (burst && allBattery) {
    return allBattery;
  }

  if (canBeatDownWithAllBattery && !data.player.armdozer.enableBurst && !data.player.pilot.enableSkill && allBattery) {
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
const defenseRoutine: SimpleRoutine = data => {
  const burst = data.commands.find(v => v.type === "BURST_COMMAND");
  const allBattery = data.commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery);
  const battery3 = data.commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === 3);
  const battery1 = data.commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === 1);

  if (burst && data.enemy.armdozer.battery === 0) {
    return burst;
  }

  if (battery3 && data.enemy.armdozer.battery === 5) {
    return battery3;
  }

  if (battery1) {
    return battery1;
  }

  if (allBattery) {
    return allBattery;
  }

  return ZERO_BATTERY;
};

/**
 * ハードコース シンブレイバー NPC
 *
 * @returns NPC
 */
export function hardShinBraver(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}