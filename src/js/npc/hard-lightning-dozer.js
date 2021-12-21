// @flow

import type {NPC} from "./npc";
import {ArmDozerIdList, ArmDozers, correctPower, PilotIds, Pilots} from "gbraver-burst-core";
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
  const hasCorrectPower = 0 < correctPower(data.enemy.armdozer.effects);
  const pilot = data.commands.find(v => v.type === 'PILOT_SKILL_COMMAND');
  const allBattery = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery);
  const allBatteryMinusOne = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery - 1);
  const canBeatDownWithAllBattery = canBeatDown(data.enemy, data.enemy.armdozer.battery, data.player, data.player.armdozer.battery);

  if (data.enemy.armdozer.battery === 5 && pilot) {
    return pilot;
  }

  if (hasCorrectPower && data.enemy.armdozer.battery === 5 && allBattery) {
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
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  const allBattery = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery);
  const isDefeatedWithBattery1 = canBeatDown(data.player, data.player.armdozer.battery, data.enemy, 1);

  if (burst) {
    return burst;
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
 * ハードコース ライトニングドーザ NPC
 *
 * @returns NPC
 */
export function hardLightningDozer(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.LIGHTNING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}