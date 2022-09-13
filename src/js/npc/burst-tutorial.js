// @flow
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {NPC} from "./npc";
import type {SimpleRoutine} from "./simple-npc";
import {SimpleNPC} from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY = {type: 'BATTERY_COMMAND', battery: 0};

/** @override 攻撃ルーチン */
const attackRoutine: SimpleRoutine = data => {
  const battery4 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 4);
  return battery4 ?? ZERO_BATTERY;
};

/** @override 防御ルーチン*/
const defenseRoutine: SimpleRoutine = data => {
  const burst = data.commands.find(v => v.type === 'BURST_COMMAND');
  const battery1 = data.commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  return burst ?? battery1 ?? ZERO_BATTERY;
};

/**
 * バーストチュートリアル用ライトニングドーザNPC
 *
 * @return NPC
 */
export function burstTutorialNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.LIGHTNING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}