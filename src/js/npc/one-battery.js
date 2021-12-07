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
 * バッテリー1を出すルーチン
 */
const oneBatteryRoutine: SimpleRoutine = data => {
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  return battery1 ?? ZERO_BATTERY;
};

/**
 * バッテリー1をひたすら出す、ネオランドーザNPC
 *
 * @return NPC
 */
export function oneBatteryNeoLandozerNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, oneBatteryRoutine, oneBatteryRoutine);
}

/**
 * バッテリー1をひたすら出す、シンブレイバーNPC
 *
 * @return NPC
 */
export function oneBatteryShinBraverNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, oneBatteryRoutine, oneBatteryRoutine);
}