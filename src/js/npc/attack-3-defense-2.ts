import {ArmDozerIds, ArmDozers, Command, PilotIds, Pilots} from "gbraver-burst-core";
import type { NPC } from "./npc";
import type { SimpleRoutine } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = {
  type: "BATTERY_COMMAND",
  battery: 0
};

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = data => {
  const battery3: Command | undefined = data.commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === 3);
  return battery3 ?? ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = data => {
  const battery2: Command | undefined = data.commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === 2);
  const battery1: Command | undefined = data.commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === 1);
  return battery2 ?? battery1 ?? ZERO_BATTERY;
};

/**
 * 3攻撃、2防御、ライトニングドーザNPC
 * @return NPC
 */
export function attack3Defense2LightningDozerNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIds.LIGHTNING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}

/**
 * 3攻撃、2防御、シンブレイバーNPC
 * @return NPC
 */
export function attack3Defense2ShinBraverNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}

/**
 * 3攻撃、2防御、ジェネシスブレイバーNPC
 * @return NPC
 */
export function attack3Defense2GenesisBraverNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIds.GENESIS_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}