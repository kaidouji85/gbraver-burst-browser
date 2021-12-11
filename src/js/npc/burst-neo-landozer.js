// @flow

import type {NPC} from "./npc";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {SimpleRoutine} from "./simple-npc";
import {SimpleNPC} from "./simple-npc";

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
  const maxBattery = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery);
  const maxBatteryMinusOne = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery - 1);
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  const battery0 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 0);

  const canFullBatteryAttack = data.player.armdozer.battery <= 4;
  const plusCorrectPowers = data.enemy.armdozer.effects.filter(v => v.type === 'CorrectPower' && (0 < v.power));
  const hasPlusCorrectPower = 0 < plusCorrectPowers.length;

  if (burst && canFullBatteryAttack) {
    return burst;
  }

  if (burst && battery0 && !canFullBatteryAttack) {
    return battery0;
  }

  if (hasPlusCorrectPower && maxBattery && canFullBatteryAttack) {
    return maxBattery;
  }

  if (maxBatteryMinusOne) {
    return maxBatteryMinusOne;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = data => {
  const burst = data.commands.find(v => v.type === 'BURST_COMMAND');
  const maxBattery = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery);
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);

  if (burst && maxBattery) {
    return maxBattery;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * バースト発動 ネオランドーザ
 *
 * @return NPC
 */
export function burstNeoLandozer(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
