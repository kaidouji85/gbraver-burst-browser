// @flow

import type {NPC} from "./npc";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {SimpleRoutine} from "./simple-npc";
import {SimpleNPC} from "./simple-npc";
import {canBeatDown} from "./can-beat-down";

/** 0バッテリー */
const ZERO_BATTERY = {
  type: 'BATTERY_COMMAND',
  battery: 0
};

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = data => {
  const burst = data.commands.find(v => v.type === 'BURST_COMMAND');
  const allBattery = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery);
  const allBatteryMinusOne = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery - 1);
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
  const burst = data.commands.find(v => v.type === 'BURST_COMMAND');
  const allBattery = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery);
  const battery3 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 3);
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  const isDefeatedWithBattery3 = canBeatDown(data.player, data.player.armdozer.battery, data.enemy, 3);
  const isDefeatedWithBattery1 = canBeatDown(data.player, data.player.armdozer.battery, data.enemy, 1);

  if (burst && data.enemy.armdozer.battery === 0) {
    return burst;
  }

  if (battery3 && !isDefeatedWithBattery3 && data.enemy.armdozer.battery === 5) {
    return battery3;
  }

  if (battery1 && !isDefeatedWithBattery1) {
    return battery1;
  }

  if (allBattery) {
    return allBattery;
  }

  return ZERO_BATTERY;
};

/**
 * バースト発動 シンブレイバー NPC
 *
 * @returns NPC
 */
export function burstShinBraver(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}