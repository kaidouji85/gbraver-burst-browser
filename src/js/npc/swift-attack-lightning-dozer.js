// @flow

import type {NPC} from "./npc";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots, totalCorrectPower} from "gbraver-burst-core";
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
  const hasCorrectPower = 0 < totalCorrectPower(data.enemy.armdozer.effects);
  const fullAttack = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.maxBattery);
  const pilot = data.commands.find(v => v.type === 'PILOT_SKILL_COMMAND');
  const attackBattery = data.enemy.armdozer.battery - 1;
  const attack = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === attackBattery);

  if (pilot) {
    return pilot;
  }

  if (hasCorrectPower && fullAttack) {
    return fullAttack;
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
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);

  if (burst) {
    return burst;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * 速攻戦法 ライトニングドーザ NPC
 *
 * @returns NPC
 */
export function swiftAttackLightningDozer(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.LIGHTNING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}