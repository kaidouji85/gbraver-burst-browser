// @flow

import type {NPC} from "./npc";
import type {Armdozer, Command, GameState, Pilot, PlayerId, PlayerState} from "gbraver-burst-core";
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
  const fullAttack = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.maxBattery);
  const burst = data.commands.find(v => v.type === 'BURST_COMMAND');
  const attackBattery = data.enemy.armdozer.battery - 1;
  const attack = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === attackBattery);

  if (fullAttack && burst) {
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
  const battery3 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 3);
  const isFullBattery = data.enemy.armdozer.battery === data.enemy.armdozer.maxBattery;

  if (isFullBattery && burst && battery3) {
    return battery3;
  }

  if (burst) {
    return burst;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * バースト発動 ライトニングドーザ NPC
 *
 * @returns NPC
 */
export function burstLightningDozer(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.LIGHTNING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}