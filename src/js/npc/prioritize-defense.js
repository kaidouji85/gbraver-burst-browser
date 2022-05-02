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
const attackRoutine: SimpleRoutine = ({commands, enemy, player}) => {
  const battery1 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  if (battery1 && (player.armdozer.battery < enemy.armdozer.battery)) {
    return battery1;
  }
  return ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = ({commands, enemy, player}) => {
  const oneGreaterThanPlayer = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === player.armdozer.battery + 1);
  if (oneGreaterThanPlayer) {
    return oneGreaterThanPlayer;
  }

  const sameSaPlayer = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === player.armdozer.battery);
  if (sameSaPlayer) {
    return sameSaPlayer;
  }

  const maxBattery = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === enemy.armdozer.battery);
  const battery1 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  return maxBattery ?? battery1 ?? ZERO_BATTERY;
};

/**
 * 防御優先、ネオランドーザNPC
 *
 * @return NPC
 */
export function prioritizeDefenseNeoLandozer(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}

/**
 * 防御優先、シンブレイバーNPC
 *
 * @return NPC
 */
export function prioritizeDefenseShinBraverNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}