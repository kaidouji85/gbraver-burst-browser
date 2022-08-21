// @flow
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
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
 * バッテリー1を出すルーチン
 */
const oneBatteryRoutine: SimpleRoutine = data => {
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  return battery1 ?? ZERO_BATTERY;
};

/**
 * バッテリーシステムチュートリアル用NPC
 *
 * @return NPC
 */
export function batterySystemTutorialNPC(): NPC {
  const origin = ArmDozers.find(v => v.id === ArmDozerIdList.WING_DOZER) ?? ArmDozers[0];
  const armdozer = {...origin, power: 1800, speed: 1500};
  const pilot = Pilots.find(v => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, oneBatteryRoutine, oneBatteryRoutine);
}