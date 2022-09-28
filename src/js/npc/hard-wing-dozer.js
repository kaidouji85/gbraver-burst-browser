// @flow

import {ArmDozerIds, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {NPC} from "./npc";
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
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  const battery4 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 4);
  const battery5 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 5);

  if (burst && battery5) {
    return battery5;
  }

  if (battery4) {
    return battery4;
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
 * ハードコース ウィングドーザ NPC
 * @return NPC
 */
export function hardWingDozer(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIds.WING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
