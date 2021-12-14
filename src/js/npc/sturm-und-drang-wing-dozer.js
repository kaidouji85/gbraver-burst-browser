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
  const pilot = data.commands.find(v => v.type === 'PILOT_SKILL_COMMAND');
  const battery5 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 5);
  const allBatteryMinusOne = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === data.enemy.armdozer.battery - 1)

  if (pilot && battery5) {
    return battery5;
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
const defenseRoutine: SimpleRoutine = data => {
  const burst = data.commands.find(v => v.type === 'BURST_COMMAND');
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);

  if (burst) {
    return burst;
  }

  return battery1 ?? ZERO_BATTERY;
};

/**
 * 疾風怒濤、ウィングドーザNPC
 *
 * @return NPC
 */
export function sturmUndDrangWingDozerNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.WING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
