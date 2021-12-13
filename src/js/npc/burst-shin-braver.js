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
  const maxBatteryAttack = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.maxBattery);
  const allBatteryAttack = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery);
  const attack = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery - 1);
  const canBeatDownWithAllBatteryAttack = canBeatDown(data.enemy, data.enemy.armdozer.battery, data.player, data.player.armdozer.battery);

  if (burst && maxBatteryAttack) {
    return maxBatteryAttack;
  }

  if (canBeatDownWithAllBatteryAttack && !data.player.armdozer.enableBurst && !data.player.pilot.enableSkill && allBatteryAttack) {
    return allBatteryAttack;
  }

  if (attack) {
    return attack;
  }

  return ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = data => {
  const burst = data.commands.find(v => v.type === 'BURST_COMMAND');
  const fullDefense = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.maxBattery);
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);

  if (burst) {
    return burst;
  }

  if (fullDefense) {
    return fullDefense;
  }

  if (battery1) {
    return battery1;
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